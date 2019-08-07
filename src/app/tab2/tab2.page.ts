import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  private lineChart: Chart;
  private activeChart: Chart;
  private activeChart2: Chart;
  private chartcount: number;
  private measureChange: boolean;
  private periodofMonth: number;

  test = 1;
  videoId = "https://www.youtube.com/embed/TlQ8txalLYg";

  constructor(private dom: DomSanitizer) {
    this.measureChange = true;
    this.periodofMonth = 6;
    this.chartcount = 0;
  }

  charDataset_weight = {
    first: {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Kyle's weight change ( Kg )",
            fill: false,
            lineTension: 0.2,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: [85, 81, 80, 81, 79, 73, 71, 70, 71, 70, 69, 70],
            spanGaps: false
          },
          {
            label: "My weight change",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(115, 18, 18, 0.4)",
            borderColor: "rgba(115, 18, 18,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(115, 18, 18,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(115, 18, 18,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: [90, 88, 89, 91, 91, 90, 92],
            spanGaps: false
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                callback: value => {
                  return value + "kg";
                }
              }
            }
          ]
        }
      }
    },
    second: {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Kyle's muscle change",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [35, 35, 32, 32, 33, 35, 36],
            spanGaps: false
          }
        ]
      }
    }
  };

  ngOnInit() {
    this.lineChart = new Chart(
      this.lineCanvas.nativeElement,
      this.charDataset_weight.first
    );
  }

  sanitize(videoUrl) {
    return this.dom.bypassSecurityTrustResourceUrl(videoUrl);
  }

  changeData() {
    if (this.chartcount == 0) {
      this.lineChart = new Chart(
        this.lineCanvas.nativeElement,
        this.charDataset_weight.second
      );
      this.lineChart.update();
      this.chartcount++;
    } else {
      this.lineChart = new Chart(
        this.lineCanvas.nativeElement,
        this.charDataset_weight.first
      );
      this.lineChart.update();
      this.chartcount--;
    }
  }

  viewpastData() {
    let past3month = [
      "July",
      "August",
      "September",
      "October",
      "November",
      "December/18"
    ];

    let weightData = [80, 84, 82, 83, 90, 92];
    let __lineChartData = this.lineChart;

    switch (this.periodofMonth) {
      case 6:
        this.unshiftData(3, __lineChartData.data, past3month, weightData);
        __lineChartData.update();
        this.periodofMonth = this.periodofMonth + 3;
        break;
      case 9:
        this.unshiftData(3, __lineChartData.data, past3month, weightData);
        __lineChartData.update();
        this.periodofMonth = this.periodofMonth + 3;
        break;
      case 12:
        __lineChartData.data.labels.splice(0, 6);
        __lineChartData.data.datasets[0].data.splice(0, 6);
        __lineChartData.data.datasets[1].data.splice(0, 6);
        this.periodofMonth = this.periodofMonth - 6;
        __lineChartData.update();
        console.log(__lineChartData.data.datasets[0].data);
        break;
    }
  }

  unshiftData(count: number, chartData, dataList, targetData) {
    for (let i = count - 1; i >= 0; i--) {
      chartData.labels.unshift(dataList[i]);
    }

    chartData.datasets.forEach(dataset => {
      // console.log(dataset.data)
      for (let i = count - 1; i >= 0; i--) {
        dataset.data.unshift(targetData[i]);
      }
    });
  }

  // conversion measure of data
  dataConverse() {
    let userData_weight = this.lineChart.data.datasets[0].data;
    let userData_weight2 = this.lineChart.data.datasets[1].data;

    if (this.measureChange) {
      userData_weight.forEach((item, index, array) => {
        array[index] = item * 2.2;
        array[index] = array[index].toFixed(2);
        // function of javascript calculating error fix (toFixed fn)
      });
      userData_weight2.forEach((item, index, array) => {
        array[index] = item * 2.2;
        array[index] = array[index].toFixed(2);
        // function of javascript calculating error fix (toFixed fn)
      });

      this.lineChart.options.scales.yAxes = [
        {
          ticks: {
            callback: value => {
              return value + " lb";
            }
          }
        }
      ];

      this.lineChart.update();
      this.measureChange = false;
    } else {
      userData_weight.forEach((item, index, array) => {
        array[index] = item / 2.2;
        array[index] = array[index].toFixed(2);
        // function of javascript calculating error fix
      });
      userData_weight2.forEach((item, index, array) => {
        array[index] = item / 2.2;
        array[index] = array[index].toFixed(2);
        // function of javascript calculating error fix
      });

      this.lineChart.options.scales.yAxes = [
        {
          ticks: {
            callback: value => {
              return value + " kg";
            }
          }
        }
      ];

      this.lineChart.update();
      this.measureChange = true;
    }
    console.log(userData_weight);
  }

  viewfutureData() {
    this.lineChart.data.labels.push("progress");
    this.lineChart.update();
  }

  testFunc() {
    alert("heelo");
  }

  viewpastData2(month) {
    let past3month = [
      "July",
      "August",
      "September",
      "October",
      "November",
      "December/18"
    ];

    let weightData = [80, 84, 82, 83, 90, 92];
    let __lineChartData = this.lineChart;
    let gapMonth = this.periodofMonth - month;

    switch (month) {
      case 6:
          __lineChartData.data.labels.splice(0, 6);
          __lineChartData.data.datasets[0].data.splice(0, 6);
          __lineChartData.data.datasets[1].data.splice(0, 6);
          __lineChartData.update();
          console.log(__lineChartData.data.datasets[0].data);
        break;
      case 9:
          this.unshiftData(3, __lineChartData.data, past3month, weightData);
          __lineChartData.update();
          break;
      case 12:
          this.unshiftData(6, __lineChartData.data, past3month, weightData);
          __lineChartData.update();
          break;
      case 24:
          this.unshiftData(12, __lineChartData.data, past3month, weightData);
          __lineChartData.update();
          break;
    }

  }
}

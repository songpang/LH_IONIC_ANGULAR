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
  private measureChange: boolean;

  test = 1;
  videoId = "https://www.youtube.com/embed/TlQ8txalLYg";

  constructor(
    // public navCtrl:NavController,
    private dom: DomSanitizer
  ) {
    this.measureChange = true;
    // setInterval(() => {
    //   this.test++;
    // }, 1000)
  }

  // movePage() {
  //   this.navCtrl.push(Tab3Page);
  // }

  charDataset_weight = {
    fisrt: {
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
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [85, 81, 80, 81, 79, 73, 71, 81],
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
            pointRadius: 5,
            pointHitRadius: 10,
            data: [90, 88, 89, 91, 91, 90, 92],
            spanGaps: false
          }
        ]
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
    this.activeChart = new Chart(
      this.lineCanvas.nativeElement,
      this.charDataset_weight.fisrt
    );
    this.lineChart = this.activeChart;
  }

  sanitize(videoUrl) {
    return this.dom.bypassSecurityTrustResourceUrl(videoUrl);
  }

  dataCompare() {
    console.log("hello im : " + this.lineChart.data.datasets.label);
  }

  changeData() {
    this.activeChart = new Chart(
      this.lineCanvas.nativeElement,
      this.charDataset_weight.second
    );
    this.lineChart = this.activeChart;
    console.log("Hello i'm here" + this.activeChart);
  }

  updateConfigByMutating() {
    // this.lineChart.options.title.text = "new title";
    // this.lineChart.data.datasets[0].data = [90, 100, 110, 120, 50, 140, 150, 160];

    this.lineChart.update();
    alert("hello");
  }

  updataConfigAboutMonth(month) {
    
    let past3month = ["July","August","September","October", "November", "December/18"];
    for(let i=5;i>=0;i--) {
      this.lineChart.data.labels.unshift(past3month[i]);
    }
    this.lineChart.data.datasets.forEach(dataset => {
      dataset.data.unshift(80);
      dataset.data.unshift(83);
      dataset.data.unshift(81);
      dataset.data.unshift(89);
      dataset.data.unshift(87);
      dataset.data.unshift(86);
      
    });
    this.lineChart.update();

  }

  // conversion measure of data
  dataConverse() {
    let userData_weight = this.lineChart.data.datasets[0].data;

    if (this.measureChange) {
      userData_weight.forEach((item, index, array) => {
        array[index] = item * 2.2;
        array[index] = array[index].toFixed(2);
        // function of javascript calculating error fix
      });

      this.lineChart.data.datasets[0].label = "Kyle's weight change ( LB )";
      this.lineChart.update();
      this.measureChange = false;
    } else {
      userData_weight.forEach((item, index, array) => {
        array[index] = item / 2.2;
        array[index] = array[index].toFixed(2);
        // function of javascript calculating error fix
      });

      this.lineChart.data.datasets[0].label = "Kyle's weight change ( KG )";
      this.lineChart.update();
      this.measureChange = true;
    }
    console.log(userData_weight);
  }
}


import { Comments, Months, Methods } from './tab2.module';

import { JsonLoadFinder } from './JsonLoadFinder';

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
  videoId = 'https://www.youtube.com/embed/TlQ8txalLYg';

  constructor(
    // public navCtrl:NavController,
    private dom: DomSanitizer,
    private dataFinder: JsonLoadFinder
  ) {
    this.measureChange = true;
    this.periodofMonth = 6;
    console.log('start!');
    this.dataFinder.getJSONData('../../assets/data/loadChart.json').then(data => {
      // console.log(data);
      console.log(data[0]);
      this.activeChart = new Chart(
        this.lineCanvas.nativeElement,
        data[0].fisrt
      );

      this.lineChart = this.activeChart;
    });
  }


  viewpastData() {
    const past3month = [
      'July',
      'August',
      'September',
      'October',
      'November',
      'December/18'
    ];

    const weightData = [80, 84, 82, 83, 90, 92];
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


  // updateConfigByMutating() {
    // this.lineChart.options.title.text = "new title";
    
    // alert("hello");
    // this.lineChart.data.datasets[0].data[2] = 30;
    // this.lineChart.update();

  unshiftData(count: number, chartData, dataList, targetData) {
    for (let i = count - 1; i >= 0; i--) {
      chartData.labels.unshift(dataList[i]);
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
            callback: (value) => {
              return value + ' lb';
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
            callback: (value) => {
              return value + ' kg';
            }
          }
        }
      ];

      this.lineChart.update();
      this.measureChange = true;
    }
    console.log(userData_weight);
  }

  // viewfutureData() {
  //   this.lineChart.data.labels.push("progress");
  //   this.lineChart.update();
  // }

  // addDescription(inputText: string) {
  //   if(inputText !== "") {
  //     this.comments.push({
  //       description: inputText
  //     })
  //   } else {
  //     alert('Comments is Blank!')
  //   }
  // }

}

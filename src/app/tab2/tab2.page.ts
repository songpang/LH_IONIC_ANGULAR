import { Comments, Months, Methods } from './tab2.module';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { DomSanitizer } from "@angular/platform-browser";

// <<<<<<< HEAD
// // var db = require("mysql");

// // const con = db.createConnection({
// //   host: "localhost",
// //   user: "root",
// //   password: "YOUR DB PASSWORD!"
// // });

// // con.connect(err => {
// //   if (err) throw err;
// //   console.log("connection!");
// // });
// //=======
// >>>>>>> master

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  private lineChart: Chart;
  private activeChart: Chart;

  test = 1;
  videoId = "https://www.youtube.com/embed/TlQ8txalLYg";

  constructor(
    // public navCtrl:NavController,
    private dom: DomSanitizer
  ) {
    // setInterval(() => {
    //   this.test++;
    // }, 1000)
  }

  // movePage() {
  //   this.navCtrl.push(Tab3Page);
  // }

  comments: Comments[] = [];


  months: Months[] = [
    {
      mon: '3_month'
    },
    {
      mon: '6_month'
    },
    {
      mon: '9_month'
    },
    {
      mon: '12_month'
    }
  ]

  methods: Methods[] = [
      {
        met: "Weight"
      },
      {
        met: "PT"
      },
      {
        met: "table select"
      }
  ]
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
            label: "Kyle's weight change",
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
            pointRadius: 1,
            pointHitRadius: 10,
            data: [85, 81, 80, 81, 79, 73, 71],
            spanGaps: false
          }
        ]
      },
      options: {
        title: {
          text: "hello",
          display: true
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
    
    alert("hello");
    this.lineChart.data.datasets[0].data[2] = 30;
    this.lineChart.update();
  }

  updataConfigAboutMonth(monthValue) {

  }

  addDescription(inputText: string) {
    if(inputText !== "") {
      this.comments.push({
        description: inputText
      })
    } else {
      alert('Comments is Blank!')
    }
  }

}

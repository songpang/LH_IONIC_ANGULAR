import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { DomSanitizer } from "@angular/platform-browser";
// var db = require("mysql");

// const con = db.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "YOUR DB PASSWORD!"
// });

con.connect(err => {
  if (err) throw err;
  console.log("connection!");
});

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  @ViewChild("lineCanvas") lineCanvas: ElementRef;
  private lineChart: Chart;
  test = 1;
  videoId = "https://www.youtube.com/embed/TlQ8txalLYg";

  constructor(private dom: DomSanitizer) {
    // setInterval(() => {
    //   this.test++;
    // }, 1000)
  }

  ngOnInit() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
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
      }
    });
  }

  sanitize(videoUrl) {
    return this.dom.bypassSecurityTrustResourceUrl(videoUrl);
  }

  dataCompare() {
    console.log("hello im" + this.lineChart.data.datasets);
  }
}

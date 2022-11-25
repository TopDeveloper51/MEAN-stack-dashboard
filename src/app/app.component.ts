import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FlexmonsterPivot } from 'ng-flexmonster';
// Importing Flexmonster's connector for Highcharts
import "flexmonster/lib/flexmonster.highcharts.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'angular-mongo-chart-dashboard';
  chart: any;
  @ViewChild('pivot') pivot!: FlexmonsterPivot;

  constructor() { }

  ngOnInit(): void {
  }

  public pivotReport = {
    dataSource: {
      type: 'api',
      url: 'http://localhost:9204/dashboardServer',
      index: 'user_upload'
    }
  }

  drawChart() {
    this.pivot.flexmonster.highcharts?.getData(
        {
            type: "column",
        },
        (data: Flexmonster.GetDataValueObject) => {
            Highcharts.chart('highcharts-container', <Highcharts.Options>data);
        },
        (data: Flexmonster.GetDataValueObject) => {
            Highcharts.chart('highcharts-container', <Highcharts.Options>data);
        }
    );
  }

  onReportComplete() {
      this.pivot.flexmonster.off("reportcomplete");
      this.drawChart();
  }

}

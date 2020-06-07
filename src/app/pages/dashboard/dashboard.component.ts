import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private chart: am4charts.XYChart;
  
  displayedColumns: string[] = ['sno', 'name', 'proffession', 'age','phone','action'];
  userViewDisplay:boolean=true;
  SingleRow:any;
  userView(element) {
    this.userViewDisplay=false;
    this.SingleRow=element;
  }
  onBack() {
    this.userViewDisplay=true;
  }
  constructor(public formBuilder: FormBuilder,
    public firebaseService : FirebaseService,
    private zone: NgZone,
    public router: Router) {

    }
  dataSource:any;
  ngOnInit() {
    this.firebaseService.getvolunteers().subscribe((response)=> {
     this.dataSource=response.map(e => {
      return e.payload.doc.data()
    }); 
    console.log(this.dataSource,'this.dataSource');
    })
  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      chart.legend = new am4charts.Legend();
      chart.data = 
      [{country: "Lithuania",litres: 501.9},
      {country: "Czech Republic",litres: 301.9},
      {country: "Ireland",litres: 201.1},
      {country: "Germany",litres: 165.8},
      {country: "Australia",litres: 139.9},
      {country: "Austria",litres: 128.3}];

      chart.innerRadius = 100;
      let series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "litres";
      series.dataFields.category = "country";
    });
  }
}
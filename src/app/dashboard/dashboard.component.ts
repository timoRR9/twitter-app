import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  line = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "cs",
      "value": 5000000
    },
    {
      "name": "s",
      "value": 7200000
    },
    {
      "name": "s",
      "value": 8940000
    },
    {
      "name": "CSUSA",
      "value": 5000000
    },
    {
      "name": "Fracnce",
      "value": 7200000
    },
    {
      "name": "Gerqscmany",
      "value": 8940000
    },
    {
      "name": "UcscSA",
      "value": 5000000
    },
    {
      "name": "Franccce",
      "value": 7200000
    }
  ];
  line2 = [
    {
      "name": "A un pays",
      "value": 0
    },
    {
      "name": "N'a pas de pays",
      "value": 0
    },
  ];
  view;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Pays';
  showYAxisLabel = true;
  yAxisLabel = 'Tweet';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  infos: any;
  pays: any;

  constructor(private http: Http) { }

  getTweet() {
    return this.http.get('http://localhost:3000/tweets-moy')
      .map(resp => resp.json())
  }

  getPays() {
    return this.http.get('http://localhost:3000/nb-pays')
      .map(resp => resp.json())
  }

  ngOnInit() {
    this.getTweet()
      .subscribe(resp => {
        this.infos = resp;
        this.infos.moyRetweet = Math.round(this.infos.moyRetweet);
        this.infos.moyFollowers = Math.round(this.infos.moyFollowers);
        this.infos.moyCoverage = Math.round(this.infos.moyCoverage);
      });

    this.getPays()
      .subscribe(resp => {
        this.pays = resp;
        this.line2[0].value = this.pays.totalNbPays - this.pays.countries[this.pays.countries.length - 1].value;
        this.line2[1].value = this.pays.countries[this.pays.countries.length - 1].value;

        console.log(resp);
      });
  }


}

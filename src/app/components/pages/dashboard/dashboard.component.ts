import { Component, OnInit, ViewChild } from '@angular/core';
import { Country } from 'src/app/models/Country';
import { Plant } from 'src/app/models/Plant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  countriesList: Array<Country> = [];

  plants: Array<Plant> = [];

  constructor() { }

  ngOnInit(): void {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags').then(res => {
      res.json().then(data => {
        this.countriesList = data;
      })});
  }

  toggleSidenavButton() {
    
  }

}

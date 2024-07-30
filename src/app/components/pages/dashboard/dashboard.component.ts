import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Country } from 'src/app/models/Country';
import { Plant } from 'src/app/models/Plant';
import { UserInfo } from 'src/app/models/UserInfo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    './dashboard-mobile.component.css'
  ]
})
export class DashboardComponent implements OnInit {

  countriesList: Array<Country> = [];

  plants: Array<Plant> = [];
  firstPlants: Array<Plant> = [];

  userInfo: UserInfo | undefined = undefined;

  readings: number = 0;
  mediums: number = 0;
  reds: number = 0;
  disableds: number = 0;

  newPlantName: string = "";
  newPlantCountry: string = "";

  // uri: string = "http://localhost:3000/api/plant";
  uri: string = "https://techforb-node.onrender.com";

  flags: Array<string | undefined> = [];

  editPlantReadings: number = 0;
  editPlantMediums: number = 0;
  editPlantReds: number = 0;
  editPlantDisableds: number = 0;

  deletePlantId: number = 0;

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit(): void {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags').then(res => {
      res.json().then(data => {
        this.countriesList = data;
        this.updateData();
      })});
    
    this.userInfo = {
      "email": this.cookieService.get("email"),
      "name": this.cookieService.get("name"),
      "surname": this.cookieService.get("surname")
    }
  }

  updateData() {
    fetch(this.uri, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.cookieService.get("token")}`,
        // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdXJuYW1lIjoiYSIsIm5hbWUiOiJhIiwiZW1haWwiOiJhQGEiLCJpYXQiOjE3MjIzMDEzNTksImV4cCI6MTcyMjMwMTM2OX0.EmfJK-DYpJKdO2dDGOLAFXxG4X3ka1DiZa723_WVw9M`
        'Content-Type': 'application/json'
      }}
    ).then(res => {
      res.json().then(data => {
        this.plants = data;
        this.firstPlants = this.plants.slice(0, 5)
        console.log(this.firstPlants)
        for (let plant of this.plants) {
          this.readings += plant.readings;
          this.mediums += plant.mediums;
          this.reds += plant.reds;
          this.disableds += plant.disableds;
          this.flags.push(this.countriesList.find((plant2) => plant2.name.common == plant.country)?.flags.png)
        }
      })});
  }

  createPlant() {
    this.http.post(this.uri,{
        "name": this.newPlantName,
        "country": this.newPlantCountry
      }, { 'headers': new HttpHeaders({
        'Authorization': `Bearer ${this.cookieService.get("token")}`,
        'Content-Type': 'application/json'
      })})
      .subscribe(res => {
        this.updateData()
      });
  }

  editPlant() {
    this.http.put(this.uri,{
      "readings": this.editPlantReadings,
      "mediums": this.editPlantMediums,
      "reds": this.editPlantReds,
      "disableds": this.editPlantDisableds
    }, { 'headers': new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get("token")}`,
      'Content-Type': 'application/json'
    })})
    .subscribe(res => {
      this.updateData()
    });
  }

  deletePlant() {
    this.http.delete(this.uri + "/" + this.deletePlantId, { 'headers': new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get("token")}`,
      'Content-Type': 'application/json'
    })})
    .subscribe(res => {
      this.updateData()
      console.log(res)
    });
  }

  updateDeleteIndex(index: number) {
    this.deletePlantId = index;
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-apiuser',
  templateUrl: './apiuser.page.html',
  styleUrls: ['./apiuser.page.scss'],
})
export class ApiuserPage implements OnInit {

  characters = [];

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.http
      .get<any>("https://rickandmortyapi.com/api/character")
      .subscribe((res) => {
        console.log(res)
        this.characters = res.results;
      });
  }

}
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-apiperfil',
  templateUrl: './apiperfil.page.html',
  styleUrls: ['./apiperfil.page.scss'],
})
export class ApiperfilPage implements OnInit {

  profileId: any ;
  character: any ;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get("id");
    this.http
      .get("https://rickandmortyapi.com/api/character/" + this.profileId)
      .subscribe((res) => {
        this.character = res;
      });
  }
}
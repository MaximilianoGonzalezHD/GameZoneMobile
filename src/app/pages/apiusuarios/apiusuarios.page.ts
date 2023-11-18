import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-apiusuarios',
  templateUrl: './apiusuarios.page.html',
  styleUrls: ['./apiusuarios.page.scss'],
})
export class ApiusuariosPage implements OnInit {

  character: any = "";

  constructor(private http: HttpClient) { }

  getCharacter(): Observable<any> {
    return this.http.get<any>(
      'https://rickandmortyapi.com/api/character'
    );
  }

  ngOnInit() {
    this.getCharacter().subscribe({
      next: (data) => {
        console.log(data);
        console.log(data.results);
        this.character = data;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  })
  }

}

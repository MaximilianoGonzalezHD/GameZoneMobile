import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
inicio(){
  this.router.navigate(['/home']);
}
}

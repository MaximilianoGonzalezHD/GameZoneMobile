import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegosNintendoPage } from './juegos-nintendo.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('JuegosNintendoPage', () => {
  let component: JuegosNintendoPage;
  let fixture: ComponentFixture<JuegosNintendoPage>;
  


  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(JuegosNintendoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

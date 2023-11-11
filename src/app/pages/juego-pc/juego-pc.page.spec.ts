import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegoPcPage } from './juego-pc.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('JuegoPcPage', () => {
  let component: JuegoPcPage;
  let fixture: ComponentFixture<JuegoPcPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite,ActivatedRoute]
    }).compileComponents();
    fixture = TestBed.createComponent(JuegoPcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

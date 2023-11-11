import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegoPleiPage } from './juego-plei.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('JuegoPleiPage', () => {
  let component: JuegoPleiPage;
  let fixture: ComponentFixture<JuegoPleiPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [SQLite,ActivatedRoute]
    }).compileComponents();
    fixture = TestBed.createComponent(JuegoPleiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

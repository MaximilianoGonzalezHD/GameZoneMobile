import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CodigoPage } from './codigo.page';

describe('CodigoPage', () => {
  let component: CodigoPage;
  let fixture: ComponentFixture<CodigoPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(CodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

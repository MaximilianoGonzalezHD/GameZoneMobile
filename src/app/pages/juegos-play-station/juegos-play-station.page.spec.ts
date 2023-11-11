import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegosPlayStationPage } from './juegos-play-station.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('JuegosPlayStationPage', () => {
  let component: JuegosPlayStationPage;
  let fixture: ComponentFixture<JuegosPlayStationPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(JuegosPlayStationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaVideojuegosPage } from './lista-videojuegos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ListaVideojuegosPage', () => {
  let component: ListaVideojuegosPage;
  let fixture: ComponentFixture<ListaVideojuegosPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(ListaVideojuegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

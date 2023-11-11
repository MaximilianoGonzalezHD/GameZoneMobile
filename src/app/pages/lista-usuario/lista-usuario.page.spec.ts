import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaUsuarioPage } from './lista-usuario.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ListaUsuarioPage', () => {
  let component: ListaUsuarioPage;
  let fixture: ComponentFixture<ListaUsuarioPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(ListaUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

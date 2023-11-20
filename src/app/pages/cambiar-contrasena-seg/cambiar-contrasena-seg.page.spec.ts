import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CambiarContrasenaSegPage } from './cambiar-contrasena-seg.page';

describe('CambiarContrasenaSegPage', () => {
  let component: CambiarContrasenaSegPage;
  let fixture: ComponentFixture<CambiarContrasenaSegPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(CambiarContrasenaSegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

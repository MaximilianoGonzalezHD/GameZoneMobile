import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModPerfilPage } from './mod-perfil.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


describe('ModPerfilPage', () => {
  let component: ModPerfilPage;
  let fixture: ComponentFixture<ModPerfilPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    });
    fixture = TestBed.createComponent(ModPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

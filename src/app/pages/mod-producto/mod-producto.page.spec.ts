import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModProductoPage } from './mod-producto.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('ModProductoPage', () => {
  let component: ModProductoPage;
  let fixture: ComponentFixture<ModProductoPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite,ActivatedRoute]
    }).compileComponents();
    fixture = TestBed.createComponent(ModProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

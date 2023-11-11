import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosPagoPage } from './datos-pago.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SharedModule } from 'src/app/shared.module';
import { PrecioClpPipe } from 'src/app/pipes/precio-clp.pipe';

describe('DatosPagoPage', () => {
  let component: DatosPagoPage;
  let fixture: ComponentFixture<DatosPagoPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite,SharedModule,PrecioClpPipe]
    }).compileComponents();
    fixture = TestBed.createComponent(DatosPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

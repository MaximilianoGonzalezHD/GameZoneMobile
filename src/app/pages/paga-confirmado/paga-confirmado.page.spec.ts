import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagaConfirmadoPage } from './paga-confirmado.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PagaConfirmadoPage', () => {
  let component: PagaConfirmadoPage;
  let fixture: ComponentFixture<PagaConfirmadoPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    });
    fixture = TestBed.createComponent(PagaConfirmadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

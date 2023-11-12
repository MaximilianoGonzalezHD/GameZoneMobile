import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiperfilPage } from './apiperfil.page';

describe('ApiperfilPage', () => {
  let component: ApiperfilPage;
  let fixture: ComponentFixture<ApiperfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApiperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

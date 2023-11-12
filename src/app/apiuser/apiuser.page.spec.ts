import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiuserPage } from './apiuser.page';

describe('ApiuserPage', () => {
  let component: ApiuserPage;
  let fixture: ComponentFixture<ApiuserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApiuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

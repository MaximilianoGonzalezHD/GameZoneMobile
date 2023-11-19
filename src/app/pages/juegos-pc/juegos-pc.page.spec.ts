import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegosPcPage } from './juegos-pc.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';

describe('JuegosPcPage', () => {
  let component: JuegosPcPage;
  let fixture: ComponentFixture<JuegosPcPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [SQLite,
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(JuegosPcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
export class ActivatedRouteMock {
  private _paramMap = new ReplaySubject<any>();
  private _queryParamMap = new ReplaySubject<any>();

  readonly paramMap = this._paramMap.asObservable();
  readonly queryParamMap = this._queryParamMap.asObservable();

  constructor(initialValues?: { [key: string]: any }) {
    if (initialValues) {
      this.setParamMap(initialValues);
      this.setQueryParamMap(initialValues);
    }
  }

  setParamMap(values: { [key: string]: any }) {
    this._paramMap.next(convertToParamMap(values));
  }

  setQueryParamMap(values: { [key: string]: any }) {
    this._queryParamMap.next(convertToParamMap(values));
  }
}

function convertToParamMap(data: { [key: string]: any }) {
  const paramMap = new Map<string, any>();
  for (const key of Object.keys(data)) {
    paramMap.set(key, data[key]);
  }
  return paramMap;
}

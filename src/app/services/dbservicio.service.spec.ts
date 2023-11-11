import { TestBed } from '@angular/core/testing';

import { DbservicioService } from './dbservicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('DbservicioService', () => {
  let service: DbservicioService;

  beforeEach(() => {
    service = TestBed.inject(DbservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

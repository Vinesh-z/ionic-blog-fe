import { TestBed } from '@angular/core/testing';

import { ModblogService } from './modblog.service';

describe('ModblogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModblogService = TestBed.get(ModblogService);
    expect(service).toBeTruthy();
  });
});

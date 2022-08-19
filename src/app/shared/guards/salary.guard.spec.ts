import { TestBed } from '@angular/core/testing';

import { SalaryGuard } from './salary.guard';

describe('SalaryGuard', () => {
  let guard: SalaryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SalaryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

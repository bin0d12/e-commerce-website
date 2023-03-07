import { TestBed } from '@angular/core/testing';

import { AuthRoutingGuard } from './auth-routing.guard';

describe('AuthRoutingGuard', () => {
  let guard: AuthRoutingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRoutingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

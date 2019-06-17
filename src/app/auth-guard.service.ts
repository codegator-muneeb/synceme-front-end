import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService, NbPasswordAuthStrategy, NbPasswordAuthStrategyOptions } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';

@Injectable()
class AuthGuard implements CanActivate {

  strategyOptions: NbPasswordAuthStrategyOptions;

  constructor(private authService: NbAuthService, 
              private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
}

@Injectable()
class AuthGuardAdmin implements CanActivate {

  strategyOptions: NbPasswordAuthStrategyOptions;

  constructor(private authService: NbAuthService, 
              private router: Router,
              private accessChecker: NbAccessChecker) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      ) && this.accessChecker.isGranted("view", "admin");
  }
}

export { AuthGuard, AuthGuardAdmin };
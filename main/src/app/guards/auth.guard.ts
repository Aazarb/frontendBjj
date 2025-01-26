import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, map, of} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatusAndUpdateRole().pipe(
    map((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        router.navigate(['authentication/login']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['authentication/login']);
      return of(false);
    })
  );
};

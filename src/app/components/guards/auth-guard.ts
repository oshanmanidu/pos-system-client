import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieManagerService } from '../../services/cookie-manager';

const TOKEN_KEY = 'auth_token';

/**
 * Route guard — redirect unauthenticated users to /login.
 *
 * Usage in app.routes.ts:
 *   { path: 'dashboard', component: Dashboard, canActivate: [authGuard] }
 */
export const authGuard: CanActivateFn = () => {
  const cookieManager = inject(CookieManagerService);
  const router        = inject(Router);

  if (cookieManager.tokenExists(TOKEN_KEY)) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
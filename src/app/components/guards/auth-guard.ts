import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieManagerService } from '../../services/cookie-manager';

export const authGuard: CanActivateFn = async (route, state) => {
  const cookieService=inject(CookieManagerService);
  const router=inject(Router);

  const isExists= await cookieService.tokenIsExistsWithPromise('token');

  try { await cookieService.tokenIsExistsWithPromise('token'); 
    if(isExists){
      return true;
    }else{
      router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

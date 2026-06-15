import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Loading } from '../components/loading/loading';
import { LoadingStatus } from '../services/loading-status';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { F } from '@angular/cdk/keycodes';
import { CookieManagerService } from '../services/cookie-manager';

const TOKEN_KEY = 'auth_token';

export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {
  let statusService:LoadingStatus = inject(LoadingStatus);
  const  cookieManager = inject(CookieManagerService);
  const token = cookieManager.getToken(TOKEN_KEY) ?? cookieManager.getToken('token');
  statusService.status.next(true);

  const authenticatedReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authenticatedReq).pipe(
    catchError((error:HttpErrorResponse)=>{
      return throwError(()=>error)
    }),
    finalize(()=>{
      statusService.status.next(false)
    })
  )
};

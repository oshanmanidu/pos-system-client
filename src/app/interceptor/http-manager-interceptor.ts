import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Loading } from '../components/loading/loading';
import { LoadingStatus } from '../services/loading-status';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { F } from '@angular/cdk/keycodes';

export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {
  let statusService:LoadingStatus = inject(LoadingStatus);

  statusService.status.next(true);

  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      return throwError(()=>error)
    }),
    finalize(()=>{
      statusService.status.next(false)
    })
  )
};

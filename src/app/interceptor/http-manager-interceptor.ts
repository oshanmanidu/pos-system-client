import { HttpInterceptorFn } from '@angular/common/http';

export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SLoader } from '../service/sc-angular-loader';

/**
 * Functional HTTP interceptor for global loader
 */
export const iloadersInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(SLoader);

  if (req.headers.has('NoLoader')) {
    return next(req); // skip loader
  }

  // Show loader before request
  loaderService.show();

  // Continue request and hide loader after response (success or error)
  return next(req).pipe(finalize(() => loaderService.hide()));
};

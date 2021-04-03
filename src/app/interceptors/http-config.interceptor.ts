import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (this.authService.authToken) {
    //   const authReq = req.clone({
    //     headers: req.headers.set('Authorization', this.authService.authToken),
    //   });
    //   console.log('Making an authorized request');
    //   req = authReq;
    // }
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          console.log('processing response', event);
        }
        return event;
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          console.log('processing http error', error);
        }
        return throwError(error);
      })
    );
  }
}

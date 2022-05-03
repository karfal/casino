import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError, timer } from "rxjs";
import { catchError, retryWhen, scan, switchMap } from "rxjs/operators";

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      retryWhen(errors => errors.pipe(
          scan((acc, err: HttpErrorResponse) => ({count: acc.count + 1, err}), {count: 0, err: undefined as any}),
          switchMap(current => {

            // if we get a 500 we retry for 3 times with a delay of 1.5s, then we return the error
            if (current.err.status === 500 && current.count < 4) {
              return timer(1500);
            }

            return throwError(current.err);
          })
        )
      ),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 500:
            this.router.navigate(["/error"]);
            break;
        }

        return throwError(error);
      })
    );
  }
}

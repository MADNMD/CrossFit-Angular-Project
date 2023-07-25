import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { ErrorMessageService, MessageType } from "./core/error-message.service";

@Injectable()

export class appInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private errorMessageService: ErrorMessageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({ withCredentials: true });

        return next.handle(req)
            .pipe(
                catchError((error) => {
                    this.errorMessageService.notifyForMessage({
                        text: error?.error?.message,
                        type: MessageType.Error
                    })
                    // return [error];
                    return throwError(error);
                })
            )
    }

}

export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: appInterceptor,
    provide: HTTP_INTERCEPTORS,
}
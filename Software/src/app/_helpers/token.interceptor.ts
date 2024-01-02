import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';
import { LoginService } from '../_shared/Login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storage:StorageService, private toastr:ToastrService, private router:Router, private loginService:LoginService, private storageService:StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const myToken=this.storage.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`},
        withCredentials: true
      })
    }

    return next.handle(request).pipe(
    catchError((err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status===401){
          //handle
          return this.handleUnAuthorizedError(request,next);

        }
      }
      const json = JSON.parse(JSON.stringify(err.error));
        const messageReceived = json.message;
        if(messageReceived != null && messageReceived != "")
        this.toastr.error(messageReceived);
      return throwError(()=> new Error(messageReceived))
    })
    );
  }

  logout(): void {
    this.storageService.clean();
    this.router.navigate(['']);
    window.location.reload(); 
  }

  handleUnAuthorizedError(req:HttpRequest<any>, next:HttpHandler){
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.storage.getToken()!;
    tokenApiModel.refreshToken = this.storage.getRefreshToken()!;
    return this.loginService.renewToken(tokenApiModel).pipe(
      switchMap((data:TokenApiModel)=>{
        this.storage.storeRefreshToken(data.refreshToken);
        this.storage.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization:`Bearer ${data.accessToken}`}
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toastr.warning("Token is expired, Login again");
          this.logout();
        })
      })
    )
  }

}

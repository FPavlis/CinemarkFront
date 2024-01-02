import { StorageService } from '../_services/storage.service';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Login } from './Login.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private userPayload:any;
  constructor(private http:HttpClient, public storageService:StorageService) { 
    this.userPayload=this.decodedToken();
  }

  formData:Login = new Login();
  readonly baseURL = environment.baseURL+'api/Users/'

  Allusers : Login[];

  postLogins(): Observable<any>{
    return this.http.post(this.baseURL,this.formData,httpOptions);
  }

  postRegister(): Observable<any>{
    return this.http.post<any>(`${this.baseURL}register`,this.formData,httpOptions);
  }

  postActivateUser(activationCode: string, idUser: number): Observable<any>{
    const body = ({
      activationCode: activationCode,
      idUser: idUser
    });
    return this.http.post<any>(`${this.baseURL}activate?activationCode=${activationCode}&idUser=${idUser}`, httpOptions);
  }


  putLogins(){
    return this.http.put(`${this.baseURL}/${this.formData.id_user}`,this.formData,{ withCredentials: true });
  }

  deleteLogin(id:number){
    return this.http.delete(`${this.baseURL}/${id}`,{ withCredentials: true });

  }
  
  authenticate(login:any): Observable<any>{
    return this.http.post<any>(`${this.baseURL}authenticate`,this.formData,httpOptions);
  }


  GetAllUsers(){
    return this.http.get(this.baseURL).toPromise().then(
      res =>{ this.Allusers = res as Login[];
              this.storageService.saveUsers(this.Allusers);
              return this.Allusers;
      });
      
  }

  
  decodedToken(){
    const jwtHelper=new JwtHelperService();
    const token=this.storageService.getToken()!;
    return jwtHelper.decodeToken(token)
  }

  getUsernameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  getIDUserFromToken(){
    if(this.userPayload)
    return this.userPayload.id_user;
  }

  renewToken(tokenApi:TokenApiModel){
    return this.http.post<any>(`${this.baseURL}refresh`,tokenApi);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private username$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private id_user$= new BehaviorSubject<string>("");


  constructor() { }


  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleFromStore(role:string){
    this.role$.next(role);
  }

  public getUsernameFromStore(){
    return this.username$.asObservable();
  }

  public setUsernameFromStore(username:string){
     this.username$.next(username);
  }

  public getIDUserFromStore(){
    return this.id_user$.asObservable();
  }

  public setIDUserFromStore(id_user:string){
    this.id_user$.next(id_user);
  }
}

import { StorageService } from '../_services/storage.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Bookmarks } from './bookmarks.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Films } from './films.model';
import { UserStoreService } from '../_services/user-store.service';
import { LoginService } from './Login.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class BookmarksService {

  formData:Bookmarks = new Bookmarks();
  form: any = {
    id_user:null,
    id_film:null
  };
  Films : Films[];
  readonly baseURL = environment.baseURL+'api/Bookmark/'

  list : Bookmarks[];
  public id_user$:string="";

  constructor(private http:HttpClient, public storageService:StorageService,public router:Router, public toastr:ToastrService, private userstore:UserStoreService, private loginservice:LoginService) {
    this.userstore.getIDUserFromStore()
  .subscribe(val=>{
    let id_userFromToken=this.loginservice.getIDUserFromToken();
    this.id_user$=val||id_userFromToken
  })
   }

  

  postBookmarks(bookmark:Bookmarks): Observable<any>{
    console.log(bookmark);
    return this.http.post(this.baseURL,bookmark,httpOptions);
  }

  getBookmarks(){
    return this.http.get(this.baseURL).toPromise().then(
      res =>{ this.list = res as Bookmarks[];
        this.storageService.saveBookmarks(this.list);
        return this.list;
      })  
     
  }

  authBookmark(bookmark:Bookmarks){
    return this.http.post<any>(`${this.baseURL}find`,bookmark,httpOptions);
  }

  checkBookmark(bookmark:Bookmarks){
    return this.http.post<any>(`${this.baseURL}check`,bookmark,httpOptions);
  }

  deleteBookmark(id:number){
    return this.http.delete(`${this.baseURL}/${id}`,{ withCredentials: true });
  }

  saveBookmarks(id_film:any){
    if(this.storageService.isLoggedIn()==true){
      var id=this.storageService.getUserID();
      this.form.id_user=this.id_user$;
      this.form.id_film=id_film;
      this.authBookmark(this.form).subscribe(
        res=>{
          this.postBookmarks(this.form).subscribe(
            res=>{
              this.toastr.success("Added Bookmark");
              console.log("Added Bookmark");
              //this.checkreload(0);
            },
            err=>{
              console.log(err);
              console.log("Greška kod unosa");
              }
            );
            },
        err=>{
          this.toastr.success("Bookmark Removed");
          console.log("Već ste bookmarkali određen film");
          console.log(err);
          //this.checkreload(0);
        });
    }
    else{
      this.toastr.error("You Can't bookmark if you are not logged in");
      console.error("You Can't bookmark if you are not logged in");
    }
  }

  checkreload(num:number){
    let reloadstate=num
    if(reloadstate==0){
      if(this.router.url=='/bookmarks'){
      history.go(0)
      this.router.navigateByUrl('home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['bookmarks']);
      reloadstate=1;
      ;});}
      else{
        history.go(0);
        reloadstate=1;
      }
    
    }
  }

  
}

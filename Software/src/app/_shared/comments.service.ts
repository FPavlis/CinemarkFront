import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Films } from './films.model';
import { environment } from 'src/environments/environment';
import { Comments } from './comments.model';
import { Bookmarks } from './bookmarks.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserStoreService } from '../_services/user-store.service';
import { LoginService } from './Login.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient, public storageService:StorageService, public toastr:ToastrService, public router:Router,private userstore:UserStoreService, private loginservice:LoginService) { 
    this.userstore.getIDUserFromStore()
    .subscribe(val=>{
      let id_userFromToken=this.loginservice.getIDUserFromToken();
      this.id_user$=val||id_userFromToken
    })
  }

  readonly baseURL = environment.baseURL+'api/Comments'
  formData:Comments = new Comments();

  listComments:Comments[];
  public id_user$:string="";


  postComment(film:Films, comment:string){
    const currentDate = new Date();
    if(this.storageService.isLoggedIn()==true){
    this.formData.change_date = currentDate;
    this.formData.insert_date = currentDate;
    this.formData.id_film = film.id_film;
    this.formData.comment = comment;
    this.formData.id_user = +this.id_user$;


    this.http.post(this.baseURL,this.formData).subscribe();
    this.toastr.success("Comment posted.","Success!")
    }
    else{
      this.toastr.error("You Can't comment if you are not logged in");
      console.error("You Can't comment if you are not logged in");
    }
  }

  getComments(){
    return this.http.get(this.baseURL).toPromise().then(
      res =>{ this.listComments = res as Comments[];
              this.storageService.saveComments(this.listComments);
              return this.listComments;
      })  
  }

  deleteComment(id:number){
    this.http.delete(`${this.baseURL}/${id}`).subscribe();
    this.getComments();
  }

    
}

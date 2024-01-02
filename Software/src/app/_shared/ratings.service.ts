import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ratings } from './ratings.model';
import { environment } from 'src/environments/environment.development';
import { getLocaleDateFormat } from '@angular/common';
import { Films } from './films.model';
import { StorageService } from '../_services/storage.service';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';
import { LoginService } from './Login.service';
import { UserStoreService } from '../_services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  public id_user$: string = "";

  constructor(private http:HttpClient, public storageService:StorageService, private userstore: UserStoreService, private loginService:LoginService) { 

    this.userstore.getIDUserFromStore()
      .subscribe(val=>{
    let id_userFromToken=this.loginService.getIDUserFromToken();
    this.id_user$=val||id_userFromToken
  })

  }

  formData:Ratings = new Ratings();
  readonly baseURL = environment.baseURL+'api/Ratings';
  list : Ratings[];

  postRating(film:Films, rating:number){
    const currentDate = new Date();
    this.formData.change_date = currentDate;
    this.formData.insert_date = currentDate;
    this.formData.id_film = film.id_film;
    this.formData.rating = rating;
    this.formData.id_user = parseInt(this.id_user$);
    
    this.http.post(this.baseURL,this.formData).subscribe();

  }

  getRatings(){
    this.http.get(this.baseURL,{ withCredentials: true }).toPromise().then(
      res => {this.list = res as Ratings[];
      this.storageService.saveRatings(this.list);
    });
  }
}

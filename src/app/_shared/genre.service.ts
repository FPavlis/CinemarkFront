import { StorageService } from '../_services/storage.service';
import { Films } from './films.model';
import { FilmsService } from './films.service';
import { Film_Genre } from './film_genre.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Genres } from './genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http:HttpClient, public filmservice:FilmsService, public storageService:StorageService) { }

  GenreData:Genres = new Genres();
  Film_GenreData:Film_Genre=new Film_Genre();

  listGenres:Genres[];
  listFilmGenre: Film_Genre[];

  selectedGenres:Genres[];
  selectedFilmGenres:number[];

  selectedfilm:Films;

  selectedGenre:Genres;
  selectedFilmGenre:Film_Genre;

  readonly baseURL = environment.baseURL+'api/Genres/'
  readonly baseURL2 = environment.baseURL+'api/Film_Genre/'


  GetGenres(){
    this.http.get(this.baseURL).toPromise().then(
      res =>{ this.listGenres = res as Genres[]; 
              this.storageService.saveGenres(this.listGenres);
      },
      err=>{
              console.log(err);
      }) 
  }

  GetFilmGenre(){
    this.http.get(this.baseURL2).toPromise().then(
      res =>{ this.listFilmGenre = res as Film_Genre[];
              this.storageService.saveFilmGenres(this.listFilmGenre);
      },
      err=>{
              console.log(err);
      })  
  }

  GenreForFilm(idfilm:number){
    this.GetFilmGenre();
    this.GetGenres();

    const listfilmgenre=this.storageService.getFilmGenres()
    const listgenre=this.storageService.getGenres()

    this.selectedGenres=[];
    this.selectedFilmGenres=[];

    for(var filmgenres of listfilmgenre){
      if(idfilm == filmgenres.id_film){
        for(var genres of listgenre){
          if(genres.id_genre == filmgenres.id_genre){          
            this.selectedGenres.push(genres);
          }
        }
      } 
    } 
    
    return this.selectedGenres;
  }
}


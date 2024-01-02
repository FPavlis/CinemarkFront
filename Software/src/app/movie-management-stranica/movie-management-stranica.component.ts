import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Films } from '../_shared/films.model';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FilmsService } from '../_shared/films.service';
import { GenreService } from '../_shared/genre.service';
import { Film_Genre } from '../_shared/film_genre.model';
import { Genres } from '../_shared/genre.model';
import { UserStoreService } from '../_services/user-store.service';
import { LoginService } from '../_shared/Login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-management-stranica',
  templateUrl: './movie-management-stranica.component.html',
  styleUrls: ['./movie-management-stranica.component.css']
})
export class MovieManagementStranicaComponent {

  public role$:string="";
  film:Films = new Films();
  filmList:Films[];
  genreList:Genres[];
  filmGenreList:Film_Genre[];
  genreFilm:Film_Genre = new Film_Genre();
  idDelete:number;
  genres:any[];
  readonly baseURL = environment.baseURL+'api/Films'
  readonly baseURL2 = environment.baseURL + 'api/Film_Genre'
  
  constructor(public storageService:StorageService, private toastr:ToastrService, private http:HttpClient, public filmService:FilmsService, 
    public genreService:GenreService, private userstore:UserStoreService, private loginService:LoginService, private router:Router) {

    this.userstore.getRoleFromStore()
  .subscribe(val=>{
    let RoleFromToken=this.loginService.getRoleFromToken();
    this.role$=val||RoleFromToken
  })
    if(this.role$!='superadmin'){
      this.router.navigate(['']);
    }
    this.genres=this.storageService.getGenres();
    this.refreshList();
    this.getGenres();
  }

  onSubmit(form:NgForm){
    this.updateFilm(form);
    this.resetForm(form);
    this.refreshList();
  }

  populateForm(selectedFilm:Films){
    selectedFilm.release_date = selectedFilm.release_date.substring(0,10);
    this.film = Object.assign({},selectedFilm);
    this.getGenres();
    this.genreList = [];
    this.filmGenreList = [];
    const list = this.storageService.getFilmGenres();
    const list2 = this.storageService.getGenres();

    for(var filmGenre of list){
      if(filmGenre.id_film == this.film.id_film){
        this.filmGenreList.push(filmGenre);
        for(var genre of list2){
          if(genre.id_genre == filmGenre.id_genre){
            this.genreList.push(genre);
          }
        }
      }
    }
  }

  refreshList(){
    this.filmService.getFilms();
    this.filmList = this.storageService.getFilms();
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.film = new Films();
  }

  updateFilm(form: NgForm){
    this.http.put(`${this.baseURL}/${this.film.id_film}`,this.film).subscribe();
    this.toastr.info("All changes saved.","Updated!")
    this.refreshList();
  }

  getGenres(){
    this.genreService.GetFilmGenre();
    this.genreService.GetGenres();
  }

  deleteGenre(selectedGenre:Genres){
    console.log(selectedGenre);
    console.log(this.filmGenreList);

    for(var filmGenre of this.filmGenreList){
      if(filmGenre.id_genre == selectedGenre.id_genre){
        this.idDelete = filmGenre.id_field;
      }
    }
    console.log(this.idDelete);
    this.http.delete(`${this.baseURL2}/${this.idDelete}`).subscribe();
    this.toastr.error("Genre deleted from the movie.","Deleted!")
  }

  refreshGenres(){
    this.getGenres();
    this.genreList = [];
    this.filmGenreList = [];
    const list = this.storageService.getFilmGenres();
    const list2 = this.storageService.getGenres();

    for(var filmGenre of list){
      if(filmGenre.id_film == this.film.id_film){
        this.filmGenreList.push(filmGenre);
        for(var genre of list2){
          if(genre.id_genre == filmGenre.id_genre){
            this.genreList.push(genre);
          }
        }
      }
    }
  }

  openPopup(){
    let popup = document.getElementById("popup") as HTMLDivElement;
    
    popup.classList.add("open-popup");
  }

  closePopup(){
    let popup = document.getElementById("popup") as HTMLDivElement;
    
    popup.classList.remove("open-popup");

    var x = document.getElementById("selectedGenre") as HTMLSelectElement;

    this.genreFilm.id_film = this.film.id_film;
    this.genreFilm.id_genre = parseInt(x.value);

    console.log(this.genreFilm);
    this.http.post(this.baseURL2,this.genreFilm).subscribe();
    this.toastr.success("Success!","Genre Updated!")
  }
}

import { LoginService } from 'src/app/_shared/Login.service';
import { CommentsService } from '../_shared/comments.service';
import { GenreService } from '../_shared/genre.service';
import { StorageService } from './../_services/storage.service';
import { BookmarksService } from '../_shared/bookmarks.service';
import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../_shared/films.service';
import { LoginStranicaComponent } from '../login-stranica/login-stranica.component';
import { RatingsService } from '../_shared/ratings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-naslovna-stranica',
  templateUrl: './naslovna-stranica.component.html',
  styleUrls: ['./naslovna-stranica.component.css']
})
export class NaslovnaStranicaComponent {


  constructor(public filmsService:FilmsService, private router: Router) 
    {
      this.filmsService.getFilms();
    }


  onSearchClick(){
    const val = document.getElementById("inputValue") as HTMLInputElement;
    this.filmsService.getSearchedFilms(val.value);
    this.router.navigate(['search']);
  }
}

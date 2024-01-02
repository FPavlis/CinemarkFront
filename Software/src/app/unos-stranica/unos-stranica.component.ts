import { Component } from '@angular/core';
import { FilmsService } from '../_shared/films.service';
import { FilmGenreService } from '../_shared/film-genre.service';
import { Films } from '../_shared/films.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../_services/storage.service';
import { Film_Genre } from '../_shared/film_genre.model';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../_services/user-store.service';
import { LoginService } from '../_shared/Login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unos-stranica',
  templateUrl: './unos-stranica.component.html',
  styleUrls: ['./unos-stranica.component.css']
})

export class UnosStranicaComponent {

  public role$: string = "";
  genres: any[];



  constructor(private http: HttpClient, public storageService: StorageService, private toastr: ToastrService, public filmService: FilmsService,
    public filmGenreService: FilmGenreService, private userstore: UserStoreService, private loginService: LoginService, private router: Router) {

    this.userstore.getRoleFromStore()
      .subscribe(val => {
        let RoleFromToken = this.loginService.getRoleFromToken();
        this.role$ = val || RoleFromToken
      })

    this.genres = this.storageService.getGenres();
    if (this.role$ === "user") {
      this.router.navigate(['']);
    }
  }

  readonly baseURL = environment.baseURL + 'api/Films'
  newFilm: Films = new Films;
  idFilm: number;
  idGenre: number;
  genreFilm: Film_Genre = new Film_Genre;
  selectedGenre: number;
  check: boolean = false;
  films: any;

  addNewMovie() {

    this.check = false;

    const title = document.getElementById("titleID") as HTMLInputElement;
    const director = document.getElementById("directorID") as HTMLInputElement;
    const actor = document.getElementById("actorID") as HTMLInputElement;
    const date = document.getElementById("dateID") as HTMLInputElement;
    const picture = document.getElementById("pictureID") as HTMLInputElement;
    const trailer = document.getElementById("trailerID") as HTMLInputElement;
    const summary = document.getElementById("summaryID") as HTMLInputElement;

    this.newFilm.id_film = 0;
    this.newFilm.title = title.value;
    this.newFilm.director = director.value;
    this.newFilm.main_actor = actor.value;
    this.newFilm.release_date = date.value;
    this.newFilm.picture_url = picture.value;
    this.newFilm.video_url = trailer.value;
    this.newFilm.summary = summary.value;
    var genre = document.getElementById("selectedGenre") as HTMLSelectElement;
    this.selectedGenre = parseInt(genre.value);

    this.filmService.getFilms().then(x => {
      this.storageService.saveFilms(x);
      this.films = x;

      for (var film of this.films) {
        if (this.newFilm.title == film.title) {
          this.check = true;
          this.newFilm.id_film = film.id_film;
        }
      }

      if (this.check == false)
        this.AddMovie(this.newFilm, this.selectedGenre);
      else
        this.AddGenreToMovie(this.newFilm.id_film, this.selectedGenre);
    });

  }

  AddMovie(newFilm: Films, genre: number) {
    this.filmService.newMovie(newFilm).subscribe({
      next: res => {
        this.newFilm.id_film = res.id_film;
        this.toastr.success("Success!", "Movie Added!");

        const newFilmGenre = new Film_Genre();
        newFilmGenre.id_film = this.newFilm.id_film;
        newFilmGenre.id_genre = genre;

        this.filmGenreService.addGenreToMovie(newFilmGenre).subscribe({
          next: res => {
            this.toastr.success("Success!", "Genre added!");
          },
          error: err => {
            const json = JSON.parse(JSON.stringify(err.error));
            const messageReceived = json.message;
            this.toastr.error(messageReceived);
          }
        });
      },
      error: err => {
        const json = JSON.parse(JSON.stringify(err.error));
        const messageReceived = json.message;
        this.toastr.error(messageReceived);
      }
    });
  }

  AddGenreToMovie(id_filmPassed: number, selectedGenre: number) {
    const newFilmGenre = new Film_Genre();
    newFilmGenre.id_film = id_filmPassed;
    newFilmGenre.id_genre = selectedGenre;

    this.filmGenreService.addGenreToMovie(newFilmGenre).subscribe({
      next: res => {
        this.toastr.success("Success!", "Genre added!");
      },
      error: err => {
        const json = JSON.parse(JSON.stringify(err.error));
        const messageReceived = json.message;
        this.toastr.error(messageReceived);
      }
    });
  }

}
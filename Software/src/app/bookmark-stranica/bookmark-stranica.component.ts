import { BookmarksService } from '../_shared/bookmarks.service';
import { Component } from '@angular/core';
import { FilmsService } from '../_shared/films.service';
import { Films } from '../_shared/films.model';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Bookmarks } from '../_shared/bookmarks.model';
import { GenreService } from '../_shared/genre.service';
import { UserStoreService } from '../_services/user-store.service';
import { LoginService } from '../_shared/Login.service';

@Component({
  selector: 'app-bookmark-stranica',
  templateUrl: './bookmark-stranica.component.html',
  styleUrls: ['./bookmark-stranica.component.css']
})

export class BookmarkStranicaComponent {

  form: any = {
    id_user: null,
    id_film: null
  };

  bookmarks: any = {};
  recommendedFilms: Films[] = [];
  Films: Films[] = [];
  isLoggedIn = false;
  selectedFilm: Films[] = [];
  bookmark: Bookmarks[] = [];
  check = false;
  public id_user$ = '';

  constructor(public filmsService: FilmsService, public storageService: StorageService, private toastr: ToastrService, public bookmarkService: BookmarksService,
    public genreService: GenreService, public router: Router, private userstore: UserStoreService, private loginService: LoginService) {

    this.userstore.getIDUserFromStore()
      .subscribe(val => {
        let id_userFromToken = this.loginService.getIDUserFromToken();
        this.id_user$ = val || id_userFromToken
      })
    if (this.storageService.isLoggedIn())
      this.GeneratePage();

  }

  async GeneratePage() {
    await this.updateBookmarsList();
    await this.getRecommendedMovies();
  }

  updateSelectedFilm(film: string) {
    this.filmsService.updateFilmByName(film);
  }

  async updateBookmarsList() {
    this.Films = [];

    await this.filmsService.getFilms().then((movies) => {
      this.storageService.saveFilms(movies);
    })

    await this.bookmarkService.getBookmarks().then((x) => {
      this.storageService.saveBookmarks(x);
    });

    await this.getBookmarksByUser();

  }

  getRecommendedMovies() {
    this.recommendedFilms = [];
    const films = this.storageService.getFilms();
    const mybookmarks = this.storageService.getMyBookmarks()
    do {
      //stavi checker na false u svakoj iteraciji
      this.check = false;

      //generiranje random broja od 0-20
      let x = Math.round(Math.random() * 250);

      //prolaz kroz listu svih filmova
      for (var film of films) {

        //ako je id filma isti random generiranom broju
        if (film.id_film == x) {

          //provjera da li se ponavlja isti film u recommended listi
          for (var reclist of this.recommendedFilms) {
            if (reclist.id_film == film.id_film) {
              this.check = true;
            }
          }

          //provjera da li korisnik ima bookmarkan film (ako da onda nece biti u recommended listi)
          for (var booklist of mybookmarks) {
            if (booklist.id_film == film.id_film) {
              this.check = true;
            }
          }

          //ako je su sve provjere uspješno prošle dodaj recommended film u listu
          if (this.check == false) {
            this.recommendedFilms.push(film);
          }
        }
      }
      //ponavljaj sve dok nemamo 4 filma
    } while (this.recommendedFilms.length < 4);
  }

  async saveBookmarks(id_film: any) {
    await this.bookmarkService.saveBookmarks(id_film);
    await this.updateBookmarsList();
  }

  getBookmarksByUser() {
    if (!this.storageService.isLoggedIn())
      return;
      
    const bookmarkTemp = this.storageService.getBookmarks();
    const filmsTemp = this.storageService.getFilms();

    for (var films of bookmarkTemp)
      if (films.id_user == this.id_user$)
        for (var film of filmsTemp)
          if (films.id_film == film.id_film)
            this.Films.push(film);

    this.storageService.saveMyBookmarks(this.Films);
  }
}
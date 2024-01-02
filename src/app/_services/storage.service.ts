import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const USERS_KEY = 'users';
const USER_KEY2 = 'auth-user-ID';
const BOOKMARKS_KEY= 'bookmark';
const MYBOOKMARKS_KEY= 'mybookmarks';
const FILMS_KEY= 'films';
const FILM_KEY= 'film';
const GENRES_KEY= 'genres';
const FILMGENRES_KEY= 'filmgenres';
const COMMENTS_KEY= 'comments';
const RATINGS_KEY= 'ratings';



@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    
    console.error();
  }

  public saveUserID(ID: any): void {
    window.localStorage.removeItem(USER_KEY2);
    window.localStorage.setItem(USER_KEY2, JSON.stringify(ID));
    console.error();
  }

  public saveUsers(users: any): void {
    window.localStorage.removeItem(USERS_KEY);
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
    console.error();
  }

  public saveBookmarks(bookmarks: any): void {
    window.localStorage.removeItem(BOOKMARKS_KEY);
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    console.error();
  }

  public saveMyBookmarks(bookmarks: any): void {
    window.localStorage.removeItem(MYBOOKMARKS_KEY);
    window.localStorage.setItem(MYBOOKMARKS_KEY, JSON.stringify(bookmarks));
    console.error();
  }

  public saveFilms(films: any): void {
    window.localStorage.removeItem(FILMS_KEY);
    window.localStorage.setItem(FILMS_KEY, JSON.stringify(films));
    console.error();
  }

  public saveFilm(film: any): void {
    window.localStorage.removeItem(FILM_KEY);
    window.localStorage.setItem(FILM_KEY, JSON.stringify(film));
    console.error();
  }

  public saveGenres(genres: any): void {
    window.localStorage.removeItem(GENRES_KEY);
    window.localStorage.setItem(GENRES_KEY, JSON.stringify(genres));
    console.error();
  }

  public saveFilmGenres(filmgenres: any): void {
    window.localStorage.removeItem(FILMGENRES_KEY);
    window.localStorage.setItem(FILMGENRES_KEY, JSON.stringify(filmgenres));
    console.error();
  }

  public saveComments(comments: any): void {
    window.localStorage.removeItem(COMMENTS_KEY);
    window.localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    console.error();
  }

  public saveRatings(ratings: any): void {
    window.localStorage.removeItem(RATINGS_KEY);
    window.localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
    console.error();
  }

  public getUser(): any {
    const vars = window.localStorage.getItem(USER_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getUsers(): any {
    const vars = window.localStorage.getItem(USERS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getFilms(): any {
    const vars = window.localStorage.getItem(FILMS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getFilm(): any {
    const vars = window.localStorage.getItem(FILM_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getBookmarks(): any {
    const vars = window.localStorage.getItem(BOOKMARKS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getMyBookmarks(): any {
    const vars = window.localStorage.getItem(MYBOOKMARKS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getGenres(): any {
    const vars = window.localStorage.getItem(GENRES_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getFilmGenres(): any {
    const vars = window.localStorage.getItem(FILMGENRES_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getComments(): any {
    const vars = window.localStorage.getItem(COMMENTS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getUserID(): any {
    const vars = window.localStorage.getItem(USER_KEY2);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getRatings(): any {
    const vars = window.localStorage.getItem(RATINGS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }



  storeToken(tokenvalue:string){
    localStorage.setItem('token',tokenvalue)
  }

  storeRefreshToken(tokenvalue:string){
    localStorage.setItem('refreshToken',tokenvalue)
  }
  
  getToken(){
    return localStorage.getItem('token')
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }
}
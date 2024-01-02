import { Injectable } from '@angular/core';
import { Films } from './films.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Film_Genre } from './film_genre.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class FilmGenreService {

  readonly baseURL = environment.baseURL+'api/Film_Genre';

  addGenreToMovie(newFG : Film_Genre ): Observable<any> {  
    return this.http.post<any>(`${this.baseURL}`,newFG,httpOptions);
  }


  constructor(private http:HttpClient) { }
}

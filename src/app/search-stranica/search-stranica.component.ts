import { Component, OnInit} from '@angular/core';
import { FilmsService } from '../_shared/films.service';
import { Films } from '../_shared/films.model';

@Component({
  selector: 'app-search-stranica',
  templateUrl: './search-stranica.component.html',
  styleUrls: ['./search-stranica.component.css']
})
export class SearchStranicaComponent implements OnInit{

  constructor(public service:FilmsService) {}

  searchedFilms:Films[];
  page: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {

  }

  updateSelectedFilm(film:string){
    this.service.updateFilmByName(film);
  }

  scrollToTop(event: any){
    window.scrollTo({top:0, behavior: 'smooth'})
  }

}

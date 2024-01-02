import { Component, OnInit, ViewChild } from '@angular/core';
import { FilmsService } from '../_shared/films.service';
import { Films } from '../_shared/films.model';
import { RouterLink } from '@angular/router';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';
import { Film_Genre } from '../_shared/film_genre.model';
import { GenreService } from '../_shared/genre.service';
import { Genres } from '../_shared/genre.model';
import { StorageService } from '../_services/storage.service';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PaginationControlsComponent } from 'ngx-pagination';

@Component({
  selector: 'app-sort-by-stranica',
  templateUrl: './sort-by-stranica.component.html',
  styleUrls: ['./sort-by-stranica.component.css']
})


export class SortByStranicaComponent implements OnInit {

  currentPage = 1; 
  selectedFilm:Films;
  sortedFilms:Films[];
  page: number = 1;
  pageSize: number = 5;
  genres:Genres[];
  genre:string[];
  filmGenre:Film_Genre;
  check:boolean = false;


  filteredFilmsHolder:Films[];
  filteredFilms:Films[];
  genreFilter: number;
  ratingFilter: number;
  yearFilter: string;

  ratings: string[];

  years:string[] = ["","","",""];

  displayedFilms: Films[];

  

  constructor(public service:FilmsService, public genreService:GenreService, public storageService:StorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getFilms();
    this.getAllFilms();


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = 1; // reset to page 1 when the route changes
      }
    });
    const genre=this.storageService.getGenres();
    this.genres=genre;

  }
 
  updateSelectedFilm(film:string){
    this.service.updateFilmByName(film);
  }

  sortFilmByGenre(gnre:Genres){
    var g = document.getElementById(gnre.name) as HTMLAnchorElement;
    var c = document.getElementById("checkbox") as HTMLInputElement;
    if(c.checked){g.style.color = '#00ffe58e';}
    this.filteredFilms = [];
    this.sortedFilms = [];
    const filmgenre=this.storageService.getFilmGenres()
    const films= this.storageService.getFilms()
    for(var item of filmgenre){
      if(gnre.id_genre == item.id_genre){
        for(var film of films){
          this.check = false;
          if(item.id_film == film.id_film){
            this.sortedFilms.push(film);
          }
        }
      }
    }
    
    this.filterFilms();
    this.displayFilteredFilms();

    var x = document.getElementById("pagiator") as unknown as PaginationControlsComponent;
    x.pageChange;
  }

  

  sortFilmByBestRated(){
    var b = document.getElementById("BestRated") as HTMLAnchorElement;
    var c = document.getElementById("checkbox") as HTMLInputElement;

    if(c.checked){b.style.color = '#00ffe58e';}
    this.sortedFilms = [];
    this.filteredFilms = [];

    for(var item of this.service.list){
      if((item.total_rating)/(item.rating_count) >= 4.5){
        this.sortedFilms.push(item);
      }

    }
    
    this.filterFilms();
    this.displayFilteredFilms();
  }

  sortFilmByRatingCount(){
    var m = document.getElementById("MostRated") as HTMLAnchorElement;
    var c = document.getElementById("checkbox") as HTMLInputElement;

    if(c.checked){m.style.color = '#00ffe58e';}
    this.filteredFilms = [];
    this.sortedFilms = [];

    for(var item of this.service.list){
      if(item.rating_count >= 15){
        this.sortedFilms.push(item);
      }
    }
    this.filterFilms();
    this.displayFilteredFilms();
  }

  sortFilmByYear2023(){
    var y2023 = document.getElementById("2023") as HTMLAnchorElement;
    var c = document.getElementById("checkbox") as HTMLInputElement;

    if(c.checked){y2023.style.color = '#00ffe58e';}
    this.filteredFilms = [];
    this.sortedFilms = [];


    for(var item of this.service.list){
      if(item.release_date.substring(0,4) == "2023"){
        this.sortedFilms.push(item);
      }
    }

    this.filterFilms();

    this.displayFilteredFilms();
  }

  sortFilmByYear2021_2022(){
    var y2021_2022 = document.getElementById("2021 - 2022") as HTMLAnchorElement;
    var c = document.getElementById("checkbox") as HTMLInputElement;

    if(c.checked){y2021_2022.style.color = '#00ffe58e';}
    this.filteredFilms = [];
    this.sortedFilms = [];
    

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) >= "2021" && item.release_date.substring(0,4) < "2023"){
        this.sortedFilms.push(item);
      }
    }

    this.filterFilms();

    this.displayFilteredFilms();
  }

  sortFilmByYear2010_2020(){
    var y2010_2020 = document.getElementById("2010 - 2020") as HTMLAnchorElement;
    var c = document.getElementById("checkbox") as HTMLInputElement;

    if(c.checked){y2010_2020.style.color = '#00ffe58e';}
    this.filteredFilms = [];
    this.sortedFilms = [];
    

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) >= "2010" && item.release_date.substring(0,4) <= "2020"){
        this.sortedFilms.push(item);
      }
    }

    this.filterFilms();

    this.displayFilteredFilms();
  }

  sortFilmByYear2000_2010(){
    var y2000_2010 = document.getElementById("2000 - 2010") as HTMLAnchorElement;
    var c = document.getElementById("checkbox") as HTMLInputElement;

    if(c.checked){y2000_2010.style.color = '#00ffe58e';}
    this.filteredFilms = [];
    this.sortedFilms = [];
   

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) >= "2000" && item.release_date.substring(0,4) < "2010"){
        this.sortedFilms.push(item);
      }
    }

    this.filterFilms();

    this.displayFilteredFilms();
  }

  sortFilmByYear1990_2000(){
    var y1990_2000 = document.getElementById("1990 - 2000") as HTMLAnchorElement;
    var c = document.getElementById("checkbox") as HTMLInputElement;

    if(c.checked){y1990_2000.style.color = '#00ffe58e';}
    this.filteredFilms = [];
    this.sortedFilms = [];
    

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) >= "1990" && item.release_date.substring(0,4) < "2000"){
        this.sortedFilms.push(item);
      }
    }

    this.filterFilms();

    this.displayFilteredFilms();
  }

  sortFilmByYearOlder(){
    var o = document.getElementById("Older") as HTMLAnchorElement;
    var c = document.getElementById("checkbox") as HTMLInputElement;

    if(c.checked){o.style.color = '#00ffe58e';}
    this.filteredFilms = [];
    this.sortedFilms = [];

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) < "1990"){
        this.sortedFilms.push(item);
      }
    }

    this.filterFilms();

    this.displayFilteredFilms();
  }

  getAllFilms(){
    const films= this.storageService.getFilms()
    this.displayedFilms = films;
  }

  scrollToTop(event: any){
    window.scrollTo({top:0, behavior: 'smooth'})
  }

  displayFilteredFilms(){
    var x = document.getElementById("checkbox") as HTMLInputElement;

    if(x.checked){
      this.displayedFilms = this.filteredFilms;
    }else{
      this.displayedFilms = this.sortedFilms;
    }
  }

  initializeFilteredFilmsList(){
    this.filteredFilmsHolder = [];
    this.displayedFilms = [];
    this.resetAllDropDowns();
  }

  filterFilms(){
    var c = document.getElementById("checkbox") as HTMLInputElement;

    if(c.checked){  
      if(this.filteredFilmsHolder.length == 0){
        this.filteredFilmsHolder = this.sortedFilms;
        this.filteredFilms = this.sortedFilms;
      }
      else{
        for(var filteredFilm of this.filteredFilmsHolder){
          for(var sortedFilm of this.sortedFilms){
            if(filteredFilm.id_film == sortedFilm.id_film){this.filteredFilms.push(sortedFilm)}
          }      
        }
        this.filteredFilmsHolder = this.filteredFilms;
      }         
    }
  }

  resetAllDropDowns(){
    for(var item of this.genres){
      const g = document.getElementById(item.name) as HTMLAnchorElement;
      g.style.color = '#fff';
    }

    const b = document.getElementById("BestRated") as HTMLAnchorElement;
    b.style.color = '#fff';

    const m = document.getElementById("MostRated") as HTMLAnchorElement;
    m.style.color = '#fff';

    const y2023 = document.getElementById("2023") as HTMLAnchorElement;
    y2023.style.color = '#fff';

    const y2021_2022 = document.getElementById("2021 - 2022") as HTMLAnchorElement;
    y2021_2022.style.color = '#fff';

    const y2010_2020 = document.getElementById("2010 - 2020") as HTMLAnchorElement;
    y2010_2020.style.color = '#fff';

    const y2000_2010 = document.getElementById("2000 - 2010") as HTMLAnchorElement;
    y2000_2010.style.color = '#fff';

    const y1990_2000 = document.getElementById("1990 - 2000") as HTMLAnchorElement;
    y1990_2000.style.color = '#fff';

    const o = document.getElementById("Older") as HTMLAnchorElement;
    o.style.color = '#fff';
  }

}

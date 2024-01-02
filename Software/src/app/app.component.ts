import { CommentsService } from './_shared/comments.service';
import { FilmsService } from './_shared/films.service';
import { GenreService } from './_shared/genre.service';
import { BookmarksService } from './_shared/bookmarks.service';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './_shared/Login.service';
import { StorageService } from './_services/storage.service';
import { EventBusService } from './_shared/event-bus.service';
import { Subscription,timer } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;
  title = 'Cinemark';
  env = environment;
  
  eventBusSub?: Subscription;

  constructor() 
      {    }

  
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { NaslovnaStranicaComponent } from './naslovna-stranica/naslovna-stranica.component';
import { LoginStranicaComponent } from './login-stranica/login-stranica.component';
import { RouterModule } from '@angular/router';
import { BookmarkStranicaComponent } from './bookmark-stranica/bookmark-stranica.component';
import { SortByStranicaComponent } from './sort-by-stranica/sort-by-stranica.component';
import { FilmStranicaComponent } from './film-stranica/film-stranica.component';
import { environment } from 'src/environments/environment';
import { SearchStranicaComponent } from './search-stranica/search-stranica.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { BookmarksService } from './_shared/bookmarks.service';
import { FilmsService } from './_shared/films.service';
import { LoginService } from './_shared/Login.service';
import { StorageService } from './_services/storage.service';
import { GenreService } from './_shared/genre.service';
import { RatingsService } from './_shared/ratings.service';
import { CommentsService } from './_shared/comments.service';
import { UnosStranicaComponent } from './unos-stranica/unos-stranica.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TokenInterceptor } from './_helpers/token.interceptor';
import { AdminStranicaComponent } from './admin-stranica/admin-stranica.component';
import { MovieManagementStranicaComponent } from './movie-management-stranica/movie-management-stranica.component';

@NgModule({
  declarations: [
    AppComponent,
    NaslovnaStranicaComponent,
    LoginStranicaComponent,
    BookmarkStranicaComponent,
    SortByStranicaComponent,
    FilmStranicaComponent,
    SearchStranicaComponent,
    BookmarkStranicaComponent,
    UnosStranicaComponent,
    NavbarComponent,
    AdminStranicaComponent,
    MovieManagementStranicaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [//httpInterceptorProviders,
              {provide: HTTP_INTERCEPTORS,
              useClass:TokenInterceptor,
              multi:true
            },
              BookmarksService,
              FilmsService,
              LoginService,
              BookmarkStranicaComponent,
              LoginStranicaComponent,
              StorageService,
              GenreService,
              RatingsService,
              NavbarComponent,
              CommentsService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

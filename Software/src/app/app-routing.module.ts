import { LoginService } from 'src/app/_shared/Login.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginStranicaComponent } from './login-stranica/login-stranica.component';
import { NaslovnaStranicaComponent } from './naslovna-stranica/naslovna-stranica.component';
import { BookmarkStranicaComponent } from './bookmark-stranica/bookmark-stranica.component';
import { SortByStranicaComponent } from './sort-by-stranica/sort-by-stranica.component';
import { FilmStranicaComponent } from './film-stranica/film-stranica.component';
import { SearchStranicaComponent } from './search-stranica/search-stranica.component';
import { AppComponent } from './app.component';
import { UnosStranicaComponent } from './unos-stranica/unos-stranica.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminStranicaComponent } from './admin-stranica/admin-stranica.component';
import { MovieManagementStranicaComponent } from './movie-management-stranica/movie-management-stranica.component';


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: '', component: NaslovnaStranicaComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'login', component: LoginStranicaComponent},
  {path: 'bookmarks', component: BookmarkStranicaComponent, canActivate:[AuthGuard]},
  {path: 'sort', component:SortByStranicaComponent},
  {path: 'film', component:FilmStranicaComponent},
  {path: 'search', component:SearchStranicaComponent},
  {path: 'unos', component:UnosStranicaComponent, canActivate:[AuthGuard]},
  {path: 'admin', component:AdminStranicaComponent, canActivate:[AuthGuard]},
  {path: 'movie-management', component:MovieManagementStranicaComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo: 'navbar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

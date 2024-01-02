import { BookmarksService } from '../_shared/bookmarks.service';
import { FilmsService } from '../_shared/films.service';
import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgModule, } from '@angular/core';
import { Login } from 'src/app/_shared/Login.model';
import { LoginService } from 'src/app/_shared/Login.service';
import { NaslovnaStranicaComponent } from 'src/app/naslovna-stranica/naslovna-stranica.component';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { StorageService } from '../_services/storage.service';
import { delay } from 'rxjs';
import { GenreService } from '../_shared/genre.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { UserStoreService } from '../_services/user-store.service';



@Component({
  selector: 'app-login-stranica',
  templateUrl: './login-stranica.component.html',
  styleUrls: ['./login-stranica.component.css'],

})
export class LoginStranicaComponent {
  activationCode: string | null;
  idUser: number;
  public id_user$: string = "";


  form: any = {
    username: null,
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false;
  isSignUpFailed = false;
  LoginPgStatus = false;
  errorMessage = '';

  constructor(public service: LoginService, private storageService: StorageService, private toastr: ToastrService, private router: Router,
    public genreService: GenreService, public filmsService: FilmsService, public bookmarkService: BookmarksService, public navbar: NavbarComponent,
    private route: ActivatedRoute, private userStore: UserStoreService) {

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.bookmarkService.getBookmarks();
      const user = this.storageService.getUser();
      const userID = this.storageService.getUserID();
      this.navbar.checkreload(0);
    }
    this.filmsService.getFilms();

  }

  ngOnInit() {
    this.activationCode = this.route.snapshot.queryParamMap.get('activate');
    this.idUser = Number(this.route.snapshot.queryParamMap.get('idUser'));
    if (this.activationCode && this.idUser) {
      this.service.postActivateUser(this.activationCode, this.idUser).subscribe({
        next: res => {
          this.toastr.success('Your account has been activated');
        },
        error: err => {
          const json = JSON.parse(JSON.stringify(err.error));
          const messageReceived = json.message;
          this.toastr.error(messageReceived);
        }
      });
    }
  }

  registerACT() {
    var x = document.getElementById("loginID") as HTMLDivElement;
    var y = document.getElementById("registerID") as HTMLDivElement;
    var z = document.getElementById("btn") as HTMLDivElement;
    
    x.style.left = "-41.2796697626419vh";
    y.style.left = "5.159958720330238vh";
    z.style.left = "11.351909184726523vh";
  }

  loginACT() {
    var x = document.getElementById("loginID") as HTMLDivElement;
    var y = document.getElementById("registerID") as HTMLDivElement;
    var z = document.getElementById("btn") as HTMLDivElement;

    x.style.left = "5.159958720330238vh";
    y.style.left = "46.43962848297214vh";
    z.style.left = "0vw";
  }

  onSubmit(form: NgForm): void {
    this.service.postRegister().subscribe({
      next: res => {
        this.toastr.success('Submitted successfully', 'Register');
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.resetForm(form);
        this.loginACT;
      },
      error: err => {
        this.isSignUpFailed = true;
        const json = JSON.parse(JSON.stringify(err.error));
        const messageReceived = json.message;
        this.toastr.error(messageReceived);
        this.resetForm(form);
      }
    });
  }

  onLogin(form: NgForm) {
    this.service.authenticate(form).subscribe(
      res => {
        this.storageService.storeToken(res.accessToken);
        this.storageService.storeRefreshToken(res.refreshToken);
        const tokenPayload = this.service.decodedToken();
        this.userStore.setUsernameFromStore(tokenPayload.Username);
        this.userStore.setRoleFromStore(tokenPayload.role);
        this.userStore.setIDUserFromStore(tokenPayload.id_user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.LoginPgStatus = true;
        this.toastr.success('You are logged in');
        this.resetForm(form);
        window.location.reload();
      },
      err => {
        console.log(err);
        const json = JSON.parse(JSON.stringify(err.error));
        const messageReceived = json.message;
        this.toastr.error(messageReceived);
        this.isLoginFailed = true;
      }

    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Login();
  }

  reloadPage(): void {
    location.reload();
  }

}

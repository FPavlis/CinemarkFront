import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService:StorageService, private router:Router, private toast:ToastrService){

  }

  canActivate():boolean{  
    if(this.storageService.isLoggedIn()){
        return true;
    }
    else{
      this.toast.error("Please Login First!");
      this.router.navigate(['']);
      return false;
    }
  }
  
}

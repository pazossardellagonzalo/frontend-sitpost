import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private usersService: UsersService,
    private router: Router
    ){}

  canActivate(): boolean{

    if(!this.usersService.isAuth()){
      console.log('This token has expired or is not valid');
      this.router.navigate(['login']);
      return false;
    }
    return true;

  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users/users.service';
import { LoginComponent } from '../users/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(
    public usersService: UsersService,
    private router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  isLogged() {
    if(localStorage.getItem('token') != null){
      this.user = localStorage.getItem('user');
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.clear();
    this.toastr.success('Succesfully logged out', 'Disconnected');
    this.router.navigate([
      ''
    ]);
  }

}

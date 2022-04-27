import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string = '';
  user: string = '';
  email: string = '';

  constructor(
    private userService: UsersService
    ) { }

  ngOnInit(): void {
    this.showProfile();
  }

  showProfile() {

    if(this.userService.isAuth()){
      const username = localStorage.getItem('user');
      console.log(username);
      this.userService.profile(username || '').subscribe((data) => {
        this.user = data.username;
        this.email = data.email;
      })
    } else {
      console.log('error')
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/users';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string | null;
  hide = true;

  constructor(
    public usersService: UsersService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public router: Router,
    public aRouter: ActivatedRoute
  ) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(9)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.username = this.aRouter.snapshot.paramMap.get('username');
  }

  ngOnInit(): void {
  }

  signIn(){
    
    const user: Users = {
      username: this.loginForm.get('username')?.value,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };
    
    localStorage.setItem('password', user.password!);
    
    try {

      this.usersService.getLoginInfo(user.username!, user.password!).subscribe(
        data => {
          this.usersService.signIn(user).subscribe((data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', user.username!);
            this.toastr.success('Succesfully logged', 'User logged');
            this.router.navigate([
              ''
            ]);
          });
        },
        error => {
          this.toastr.warning('Wrong username or password', 'Try again');
        }
      );

    } catch (error) {
      this.toastr.error('Something went wrong', 'Try again later');
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
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
  email: string | null


  constructor(
    public usersService: UsersService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public router: Router,
    public aRouter: ActivatedRoute
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.email = this.aRouter.snapshot.paramMap.get('email');
  }

  ngOnInit(): void {
  }

  signIn(){
    
    const user: Users = {
      username: this.loginForm.get('username')?.value,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    
    if(user.email !== null && user.password !== null) {
      this.usersService.getLoginInfo(user.email).subscribe((data) => {
        console.log(data);
        if(data != null) {
          this.usersService.signIn(user).subscribe();
          this.toastr.success('Succesfully registered', 'User created');
          this.router.navigate([
            ''
          ]);
        } else {
          this.toastr.warning('Incorrect password or email', 'Try again');
        }
      })
    }

  }

}

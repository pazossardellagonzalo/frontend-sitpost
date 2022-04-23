import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/users';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  username: string | null;

  constructor(
    public usersService: UsersService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public router: Router,
    public aRouter: ActivatedRoute
    ) {
      this.registerForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.username = this.aRouter.snapshot.paramMap.get('username');
    }

  ngOnInit(): void {
  }

  createUser(){

    const user: Users = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }

    this.usersService.singUp(user).subscribe();
    this.toastr.success('Succesfully registered', 'User created');
    this.router.navigate([
      ''
    ]);
  }

}

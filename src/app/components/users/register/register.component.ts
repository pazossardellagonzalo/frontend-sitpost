import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
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
  file: any = null;
  photoSelected: any = null;

  constructor(
    public usersService: UsersService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public router: Router,
    public aRouter: ActivatedRoute
    ) {
      this.registerForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]')]],
        email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
        password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]')]],
        userImage: ['', [Validators.required]]
      });
      this.username = this.aRouter.snapshot.paramMap.get('username');
    }

  ngOnInit(): void {
  }

  createUser(){

    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const userImage = this.file;


    try {
      this.usersService.singUp(username, email, password, userImage).subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', username || '');
          this.toastr.success('Succesfully registered', 'User created');
          this.router.navigate([
            ''
          ]);
        },
        error => {
          this.toastr.warning('Username or email already exists', 'Try again');
        }
      );
    } catch (error) {
        this.toastr.error('Error ocurred', 'Try again later');
    }

  }

  onPhotoSelected(event:any) {
    if(event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // Image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

}

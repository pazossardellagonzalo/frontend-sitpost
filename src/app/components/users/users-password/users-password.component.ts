import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-password',
  templateUrl: './users-password.component.html',
  styleUrls: ['./users-password.component.css']
})
export class UsersPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  password: string | null;
  info: any = null;
  hide = true;

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]')]]
    });
    this.password = this.aRouter.snapshot.paramMap.get('password');
  }

  ngOnInit(): void {
  }

  updateProfile() {
    const username = localStorage.getItem('user');
    const password = this.passwordForm.get('password')?.value;

    this.userService.updatePassword(username!, password).subscribe((data) => {
      this.router.navigate([
        'profile'
      ]);
    })



  }

}

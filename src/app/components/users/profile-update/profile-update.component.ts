import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  editProfileForm: FormGroup;
  bio: string | null;
  file: any = null;
  photoSelected: any = null;
  info: any = null;
  user = localStorage.getItem('user')

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.editProfileForm = this.fb.group({
      bio: ['', [Validators.minLength(1), Validators.maxLength(100)]]
    });
    this.bio = this.aRouter.snapshot.paramMap.get('bio');
  }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    const user = localStorage.getItem('user');
    this.userService.profile(user!).subscribe((data) => {
      this.info = data;
      this.editProfileForm.setValue({
        bio: data.bio
      })
    })
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

  updateProfile() {
    const username = this.info.username;
    const bio = this.editProfileForm.get('bio')?.value;
    const userImage = this.file;

    this.userService.updateUser(username!, bio, userImage).subscribe((data) => {
      this.router.navigate([
        'profile'
      ]);
    })



  }

}

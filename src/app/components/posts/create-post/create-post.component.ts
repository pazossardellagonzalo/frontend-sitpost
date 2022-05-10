import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Posts } from 'src/app/models/posts';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  title: string | null;
  likes: number = 0;
  file: any = null;
  photoSelected: any = null;

  constructor(
    public postService: PostsService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public router: Router,
    public aRouter: ActivatedRoute
    ) {
      this.postForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(20)]],
        body: ['', [Validators.required, Validators.maxLength(200)]]
      });
      this.title = this.aRouter.snapshot.paramMap.get('title');
    }

  ngOnInit(): void {
  }

  post(){

      const user = localStorage.getItem('user');
      const title = this.postForm.get('title')?.value;
      const body = this.postForm.get('body')?.value;
      const image = this.file;

    try {
      this.postService.Post(user!, title, body, image).subscribe(
        data => {
        this.toastr.success('Succesfully created', 'Post created');
        this.router.navigate([
          ''
        ]);
      },
      error => {
        this.toastr.error('Couldnt create post', 'Try again');
      }
      );
    } catch (error) {
        this.toastr.warning('Error ocurred', 'Try again later');
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

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

    const post: Posts = {
      user: localStorage.getItem('user'),
      title: this.postForm.get('title')?.value,
      body: this.postForm.get('body')?.value
    };

    try {
      console.log(post);
      this.postService.Post(post).subscribe(
        data => {
        console.log(data);
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

}

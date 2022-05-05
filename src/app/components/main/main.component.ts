import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comments } from 'src/app/models/comments';
import { Posts } from 'src/app/models/posts';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  body: any = null;
  posts: Array<any> = [];
  exist: boolean = false;
  test: any = null;
  replyOpen: boolean = false;
  reply: boolean = false;
  value: any = null;
  commentForm: FormGroup;
  comments: any = null;
  showComment: boolean = false;
  element: Array<any> = [];
  test2: any = null;
  searchText = '';

  constructor(
    private postsService: PostsService,
    private toastr: ToastrService,
    private commentsService: CommentsService,
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
  ) { 
    this.commentForm = this.fb.group({
      user: [''],
      body: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
      postID: ['']
    });
    this.body = this.aRouter.snapshot.paramMap.get('body');
  }

  ngOnInit(): void {
    this.showPosts();
  }

  showPosts() {

    this.postsService.allPosts().subscribe((data) => {
      this.posts = data;
      const user = localStorage.getItem('user');

      for (let index = 0; index < this.posts.length; index++) {
        if(this.posts[index].user === user) {
          this.test = this.posts[index].user;
        }
      }
    })

  }

  showComments(value: any) {

    this.showComment = true;
    this.commentsService.showComments(this.value).subscribe((data) => {
      this.element = data;
      const user = localStorage.getItem('user');

      for (let index = 0; index < this.element.length; index++) {
        if(this.element[index].user === user) {
          this.test2 = this.element[index].user;
        }
      }
    });
  }

  deletePost(id: string) {
    this.postsService.deletePost(id).subscribe((data) => {
      if(data != null){
        this.toastr.success('Succesfully deleted', 'Post deleted');
        window.location.reload();
      }
    });

  }

  deleteComment(id: string){
    this.commentsService.deleteComment(id).subscribe((data) => {
      if(data != null){
        this.toastr.success('Succesfully deleted', 'Comment deleted');
        window.location.reload();
      }
    });
  }

  open(value: any) {
    this.replyOpen = true;
    this.reply = true;
  }

  close() {
    this.replyOpen = false;
    this.reply = false;
  }

  addComment(value: any) {
    const comments: Comments = {
      user: localStorage.getItem('user'),
      body: this.commentForm.get('body')?.value,
      postID: value
    };

    try {
      this.commentsService.Comment(comments).subscribe(
        data => {
          this.toastr.success('Succesfully commented', 'Comment created');   
          this.close();
        },
        error => {
          this.toastr.warning('Comment couldnt be posted', 'Try again later');
        });
    } catch (error) {
        this.toastr.error('Error ocurred', 'Try again later');
    }
  }

  closeComments() {
    this.showComment = false;
  }

}

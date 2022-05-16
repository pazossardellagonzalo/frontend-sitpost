import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comments } from 'src/app/models/comments';
import { Posts } from 'src/app/models/posts';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  commentsShow: boolean = false;
  postBody: Posts = {
    user: '',
    title: '',
    body: '',
    likes: 0,
    image: ''
  };
  commentBody: Comments = {
    user: '',
    body: '',
    postID: '',
    commentLikes: 0
  };
  chunk: Array<any> = [];

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
<<<<<<< HEAD
      this.posts = data
      this.posts.reverse();
=======
      this.posts = data;
      this.posts.reverse();
      this.chunk = this.posts.slice(0,5)
>>>>>>> dev
      const user = localStorage.getItem('user');
      
      for (let index = 0; index < this.posts.length; index++) {
        if(this.posts[index].user === user) {
          this.test = this.posts[index].user;
        }
      }

    })

  }

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.posts.length) {
      endIndex = this.posts.length;
    }
    this.chunk = this.posts.slice(startIndex, endIndex);  
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
    this.commentsShow = true;
  }

  close() {
    this.replyOpen = false;
    this.reply = false;
    this.commentsShow = false;
  }

  addComment(value: any) {
    this.commentsShow = false;
    const comments: Comments = {
      user: localStorage.getItem('user'),
      body: this.commentForm.get('body')?.value,
      postID: value
    };

    try {
      this.commentsService.Comment(comments).subscribe(
        data => {
          this.toastr.success('Succesfully commented', 'Comment created');   
          window.location.reload();
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

  userProfile(username: string) {
    localStorage.setItem('userProfile', username);
    const user = localStorage.getItem('user');
    if(username === user) {
      this.router.navigate([
        'profile'
      ]);
    } else {
      this.router.navigate([
        `userProfile/${username}`
      ]);
    }
  }

  isLogged() {
    if(localStorage.getItem('token') != null){
      this.test = localStorage.getItem('user');
      return true;
    } else {
      return false;
    }
  }
  
  like(id: string) {
    const username = localStorage.getItem('user');
    this.postsService.likePost(username!, id, this.postBody).subscribe(
      data => {
        window.location.reload();
      },
      error => {
        this.router.navigate([
          'login'
        ]);
      });
  }

  likeComment(id: string) {
    const username = localStorage.getItem('user');
    this.commentsService.likeComment(username!, id, this.commentBody).subscribe(
      data => {
        window.location.reload();
      },
      error => {
        this.router.navigate([
          'login'
        ]);
      });
  }

}

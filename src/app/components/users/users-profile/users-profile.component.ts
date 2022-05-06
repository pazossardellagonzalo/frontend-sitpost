import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comments } from 'src/app/models/comments';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  userProfile: any = null;
  posts: Array<any> = [];
  showComment: boolean = false;
  value: any = null;
  test2: any = null
  element: Array<any> = [];
  body: any = null;
  commentForm: FormGroup;
  replyOpen: boolean = false;
  reply: boolean = false;

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private postService: PostsService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private commentsService: CommentsService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      user: [''],
      body: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
      postID: ['']
    });
    this.body = this.aRouter.snapshot.paramMap.get('body');
  }

  ngOnInit(): void {
    this.showProfile();
  }

  showProfile() {
    const username = localStorage.getItem('userProfile');
    this.userService.usersProfiles(username!).subscribe((data) => {
      this.userProfile = data;
      this.postService.userPosts(username!).subscribe((data2) => {
        this.posts = data2;
      })
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

  closeComments() {
    this.showComment = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { Comments } from 'src/app/models/comments';
import { Posts } from 'src/app/models/posts';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string = '';
  user: string = '';
  email: string = '';
  password: string = '';
  posts: Array<any> = [];
  test: any = null;
  showComment: boolean = false;
  value: any = null;
  test2: any = null
  element: Array<any> = [];
  body: any = null;
  commentForm: FormGroup;
  replyOpen: boolean = false;
  reply: boolean = false;
  userProfile: any = null;
  commentsShow: boolean = false;
  postBody: Posts = {
    user: '',
    title: '',
    body: '',
    likes: 0,
    image: ''
  };
  file: any = null;
  photoSelected: any = null;
  userImage: any = null;
  openModal = false;

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private postService: PostsService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
    private commentsService: CommentsService
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

    if(this.userService.isAuth()){
      const username = localStorage.getItem('user');
      this.userService.profile(username!).subscribe((data) => {
        this.user = data.username;
        this.email = data.email;
        this.password = data.password;
        this.userImage = data.userImage;
        this.postService.userPosts(this.user).subscribe((data) => {
          this.posts = data;
        })
      })
    } else {
      this.toastr.warning('Error occured', 'Contact with an Administrator');
    }

  }

  deleteUser() {

    try {

      const user = localStorage.getItem('user');
      if(confirm('Are you sure that you want to delete your user, all data will be lost')) {
        this.userService.deleteUser(user!).subscribe((data) => {
          console.log(data);
          if(data != null) {
            this.toastr.success('Correctly deleted user', 'User deleted');
            this.router.navigate([ '' ]);
            localStorage.clear();
          } else {
            this.toastr.warning('Error', 'Try again later');
          }  
        });
      }

    } catch (error) {
      this.toastr.error('Something went wrong', 'Try again later');
    }
    
  }

  showPosts() {

    this.postService.allPosts().subscribe((data) => {
      this.posts = data;
      const user = localStorage.getItem('user');
      this.posts.reverse();

      for (let index = 0; index < this.posts.length; index++) {
        if(this.posts[index].user === user) {
          this.test = this.posts[index].user;
        }
      }
    })

  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe((data) => {
      if(data != null){
        this.toastr.success('Succesfully logged out', 'Disconnected');
        window.location.reload();
      }
    });

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
    this.commentsShow = true;
  }

  close() {
    this.replyOpen = false;
    this.reply = false;
    this.commentsShow = false;
  }

  closeComments() {
    this.showComment = false;
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
    this.postService.likePost(username!, id, this.postBody).subscribe(
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

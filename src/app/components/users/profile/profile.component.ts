import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string = '';
  user: string = '';
  email: string = '';
  posts: Array<any> = [];
  test: any = null;

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private postService: PostsService,
    private router: Router,
    private aRouter: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.showProfile();
  }

  showProfile() {

    if(this.userService.isAuth()){
      const username = localStorage.getItem('user');
      this.userService.profile(username!).subscribe((data) => {
        this.user = data.username;
        this.email = data.email;
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
      const username = localStorage.getItem('user');
      if(confirm('Are you sure that you want to delete your user, all data will be lost')) {
        this.userService.deleteUser(user!, username!).subscribe((data) => {
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
      for (let index = 0; index < this.posts.length; index++) {
        const element = this.posts[index].user;
        if(element === user) {
          this.test = element;
        }
      }
    });

  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe((data) => {
      if(data != null){
        this.toastr.success('Succesfully logged out', 'Disconnected');
        window.location.reload();
      }
    });

  }

  editPost() {
  }

}

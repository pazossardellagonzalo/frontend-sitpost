import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: any = null;
  title: any = null;
  body: any = null
  posts: Array<any> = [];
  exist: boolean = false;
  test: any = null;

  constructor(
    private postsService: PostsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.showPosts();
  }

  showPosts() {
    
    this.postsService.allPosts().subscribe((data) => {
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
    this.postsService.deletePost(id).subscribe((data) => {
      if(data != null){
        this.toastr.success('Succesfully logged out', 'Disconnected');
        window.location.reload();
      }
    });

  }

  editPost() {

  }

}

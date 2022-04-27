import { Component, OnInit } from '@angular/core';
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

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.showPosts();
  }

  showPosts() {
    
    this.postsService.allPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

}

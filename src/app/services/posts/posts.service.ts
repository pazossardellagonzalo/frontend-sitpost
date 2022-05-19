import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Posts } from 'src/app/models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url_api = 'http://api.sitpost.org:3000';

  constructor(
    private http: HttpClient
  ) { }

  allPosts(): Observable<any> {
    const url = `${this.url_api}/allPosts`;
    return this.http.get(url);
  }

  Post(user:string, title: string, body: string, image: string): Observable<any> {
    const fd = new FormData();
    fd.append('user', user);
    fd.append('title', title);
    fd.append('body', body);
    fd.append('image', image);
    const url = `${this.url_api}/post`;
    return this.http.post(url, fd);
  }

  userPosts(user: string): Observable<any> {
    const url = `${this.url_api}/userPosts/${user}`;
    return this.http.get(url);
  }

  deletePost(_id: string): Observable<any> {
    const url = `${this.url_api}/deletePost/${_id}`;
    return this.http.delete(url);
  }

  likePost(username: string, _id: string, post: Posts ): Observable<any> {
    const url = `${this.url_api}/likeCount/${username}/${_id}`;
    return this.http.put(url, post);
  }

}

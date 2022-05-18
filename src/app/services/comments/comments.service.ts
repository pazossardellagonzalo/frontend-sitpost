import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from 'src/app/models/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url_api = 'http://api.sitPost.org:3000';

  constructor(
    private http: HttpClient
  ) { }

  Comment(doc: any): Observable<any> {
    const url = `${this.url_api}/comment`;
    return this.http.post(url, doc);
  }

  showComments(postID: String): Observable<any> {
    const url = `${this.url_api}/postComments/${postID}`;
    return this.http.get(url);
  }

  deleteComment(_id: string): Observable<any> {
    const url = `${this.url_api}/deleteComment/${_id}`;
    return this.http.delete(url);
  }

  likeComment(user: string, _id: string, comment: Comments ): Observable<any> {
    const url = `${this.url_api}/likeComment/${user}/${_id}`;
    return this.http.put(url, comment);
  }
  
}

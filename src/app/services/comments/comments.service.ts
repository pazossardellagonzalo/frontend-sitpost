import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url_api = 'http://localhost:3000';

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

  
}

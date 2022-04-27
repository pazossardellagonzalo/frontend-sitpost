import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url_api = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  allPosts(): Observable<any> {
    const url = `${this.url_api}/allPosts`;
    return this.http.get(url);
  }

  Post(doc: any): Observable<any> {
    const url = `${this.url_api}/post`;
    return this.http.post(url, doc);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Users } from '../models/users';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  url_api = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  singUp(doc: any): Observable<any> {
    const url = `${this.url_api}/signUp`;
    return this.http.post(url, doc);
  }

  signIn(doc: any): Observable<any> {
    const url = `${this.url_api}/signIn`;
    return this.http.post(url, doc);
  }

  getLoginInfo(email: string): Observable<any>{
    const url = `${this.url_api}/getLogin/${email}`;
    return this.http.get(url);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Users } from '../../models/users';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  isAuthenticated = false;
  url_api = 'http://api.sitpost.org:3000';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }

  singUp(username: string, email: string, password: string, userImage: string): Observable<any> {
    const fd = new FormData();
    fd.append('username', username);
    fd.append('email', email);
    fd.append('password', password);
    fd.append('userImage', userImage);
    const url = `${this.url_api}/signUp`;
    return this.http.post(url, fd);
  }

  updateUser(username: string, bio: string, userImage: string, password: string): Observable<any> {
    const fd = new FormData();
    fd.append('userImage', userImage);
    fd.append('bio', bio);
    fd.append('password', password)
    const url = `${this.url_api}/editProfile/${username}`;
    return this.http.put(url, fd);
  }

  signIn(doc: any): Observable<any> {
    const url = `${this.url_api}/signIn`;
    return this.http.post(url, doc);
  }

  getLoginInfo(username: string, password: string): Observable<any> {
    const url = `${this.url_api}/getLogin/${username}/${password}`;
    return this.http.get(url);
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    const token = localStorage.getItem('token')
    headers.get(token || '');
    // headers.append('token', token || ''); 
  }

  profile(username: string): Observable<any> {
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
    .set('auth-token', token || '')
    const url = `${this.url_api}/profile/${username}`;
    return this.http.get(url, {headers});
  }

  isAuth() {
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token || '') || !localStorage.getItem('token')){
      this.isAuthenticated = false;
      return false;
    }
    this.isAuthenticated = true;
    return true;
  }

  deleteUser(user: string): Observable<any> {
    const url = `${this.url_api}/deleteUser/${user}`;
    return this.http.delete(url);
  }

  usersProfiles(username: string): Observable<any> {
    const url = `${this.url_api}/usersProfile/${username}`;
    return this.http.get(url);
  }

}

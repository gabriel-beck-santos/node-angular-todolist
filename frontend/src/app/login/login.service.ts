import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private LOGIN = '/login';
  userChange: Subject<String> = new Subject<String>();

  constructor(private httpClient: HttpClient) {}

  authenticate(login: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + btoa(login.email +':'+login.password)
      })
    };

    return this.httpClient
      .get<any>(environment.apiHost + environment.apiVersion + this.LOGIN, httpOptions )
      .pipe(
        map((userData) => {
          console.log(userData);
          localStorage.setItem('token', userData.token);
          localStorage.setItem('username', userData.user.name);
          this.userChange.next(userData.user.name);
          return userData;
        })
      );
  }

  isUserLoggedIn(): boolean {
    const user = localStorage.getItem('token');
    return !(user === null);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.userChange.next(null);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !(token === null);
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

}

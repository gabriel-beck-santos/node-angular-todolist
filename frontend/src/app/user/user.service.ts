import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private USERS = '/signup';
  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  createUser(user: User): Observable<any> {
    return this.httpClient
      .post<any>(
        environment.apiHost + environment.apiVersion + this.USERS,
        user
      )
      .pipe(catchError(this.handleError));
  }
}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from '../shared/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private PROJECTS = '/projects/';

  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getProjects(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient
      .get<any>(
        environment.apiHost + environment.apiVersion + this.PROJECTS,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  createProject(project: Project): Observable<any> {
    return this.httpClient
      .post<any>(
        environment.apiHost + environment.apiVersion + this.PROJECTS,
        project
      )
      .pipe(catchError(this.handleError));
  }

  deleteProject(projectId: string): Observable<any> {
    return this.httpClient
      .delete<any>(
        environment.apiHost + environment.apiVersion + this.PROJECTS + projectId
      )
      .pipe(catchError(this.handleError));
  }
}

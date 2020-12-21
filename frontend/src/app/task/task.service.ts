import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../shared/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private TASKS = '/tasks/';

  newTaskChange: Subject<Task> = new Subject<Task>();

  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getTasks(projectId: string): Observable<any> {


    return this.httpClient
      .get<any>(
        environment.apiHost + environment.apiVersion + this.TASKS + projectId
      )
      .pipe(catchError(this.handleError));
  }

  createTask(task: Task): Observable<any> {
    return this.httpClient
      .post<any>(
        environment.apiHost + environment.apiVersion + this.TASKS,
        task
      )
      .pipe(catchError(this.handleError));
  }

  updateTask(task: Task): Observable<any> {
    return this.httpClient
      .put<any>(
        environment.apiHost + environment.apiVersion + this.TASKS + task.id,
        task
      )
      .pipe(catchError(this.handleError));
  }

  deleteTask(taskid: string): Observable<any> {
    return this.httpClient
      .delete<any>(
        environment.apiHost + environment.apiVersion + this.TASKS + taskid
      )
      .pipe(catchError(this.handleError));
  }
}

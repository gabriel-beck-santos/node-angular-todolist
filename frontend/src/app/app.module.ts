import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {OverlayModule} from '@angular/cdk/overlay'
import { HttpConfigInterceptor } from './security/http.interceptor';
import { ErrorComponent } from './shared/error/error.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ProjectComponent,
    TaskComponent,
    ErrorComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }

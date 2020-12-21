import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { AuthGuard } from './security/auth.guard';
import { LoginGuard } from './security/login.guard';
import { LogoutGuard } from './security/logout.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'signup',
    component: UserComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    component: ProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    canActivate: [LogoutGuard],
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

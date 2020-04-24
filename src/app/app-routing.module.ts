import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { from } from 'rxjs';
import { SerachComponent } from './serach/serach.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "header",
    component: HeaderComponent
  },
  {
    path: "project",
    component: ProjectComponent
  },
  {
    path: "user",
    component: UserComponent
  },
  {
    path: "search",
    component: SerachComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

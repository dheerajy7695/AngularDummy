import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { from } from 'rxjs';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

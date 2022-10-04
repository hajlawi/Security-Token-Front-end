import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import  {Observable} from 'rxjs';

import {HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

import { HeaderComponent } from './header/header.component';
import {AuthService} from "./services/auth.service";

import {AuthGuardService} from "./services/auth-guard.service";
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-list/task-form/task-form.component';
import { SinglTaskComponent } from './task-list/singl-task/singl-task.component';
import {TaskService} from "./services/task.service";



const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'tasks',component: TaskListComponent },
  { path: 'tasks/new',canActivate : [AuthGuardService], component: TaskFormComponent },
  { path: 'tasks/view/:id', component: SinglTaskComponent },
  {path:'',redirectTo:'auth/signin',pathMatch:'full'},
  {path:'**',redirectTo:'auth/signin'}
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,

    HeaderComponent,
    TaskListComponent,
    TaskFormComponent,
    SinglTaskComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService,TaskService , AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

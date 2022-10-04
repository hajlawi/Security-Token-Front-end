import { Injectable } from '@angular/core';
import {Task} from "../../models/task.model";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks:Task[]=[];
  taskSubject=new Subject<any>();
  private host="http://localhost:8080/";
  constructor(private httpclient:HttpClient,private router:Router,private authservice:AuthService) { }
  emitTasks(){
    this.taskSubject.next(this.tasks);
  }
  saveTask(taskForm:Task){

      return  this.httpclient.post(this.host + "tasks",
          {taskName: taskForm.taskName},
          {observe: 'response'},);
  }

  getTasks(){
if(this.authservice.jwtToken==null){this.authservice.loadToken()}
   return this.httpclient.get<any>(this.host + "tasks",{headers:new HttpHeaders({'authorization':this.authservice.jwtToken})})
     .subscribe((data)=>{
       this.tasks=data ? data:[ ];
       this.emitTasks();
     },err=>{
       this.router.navigate(['/auth','signin']);
       this.authservice.signOutUser();
     });

  }
  getSingleTask(id:number){
    return new Promise((resolve,reject)=>{
      this.httpclient.get<any>(this.host + "tasks"+id).toPromise().then((task)=> {
        resolve(task.val());
      },error=>{
        reject(error);
      });
    });
  }
  createNewBook(newTask:Task){
    this.tasks.push(newTask);
    this.saveTask(newTask);
    this.emitTasks();
  }
  removeTask(task:Task){
    const taskIndexToRemove=this.tasks.findIndex((taskT1)=>{
      if(taskT1==task){
        return true;
      }
    });
    this.tasks.splice(taskIndexToRemove,1);
    this.saveTask(this.tasks[taskIndexToRemove]);
    this.emitTasks();
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TaskService} from "../services/task.service";
import {Task} from "../../models/task.model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit,OnDestroy {
tasks:Task[]=[];
  taskSubscription:Subscription;
  constructor(private authservice:AuthService,private taskservice:TaskService,private router:Router) { }

  ngOnInit(): void {
    this.taskSubscription=this.taskservice.taskSubject.subscribe((data:Task[])=>{
      this.tasks=data;
    });
this.taskservice.getTasks();
    this.taskservice.emitTasks();

  }
  onNewTask(){
    this.router.navigate(['/tasks','new']);
  }
  ondeleteTask(task:Task){
    this.taskservice.removeTask(task);
  }
  onViewTask(id:number){
    this.router.navigate(['/tasks','view',id]);
  }

  ngOnDestroy(): void {
   // this.taskSubscription.unsubscribe();
  }
}

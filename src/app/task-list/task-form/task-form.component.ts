import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  constructor(private taskservice:TaskService,private router:Router) { }

  ngOnInit(): void {
  }

  onsaveTask() {

  }
}

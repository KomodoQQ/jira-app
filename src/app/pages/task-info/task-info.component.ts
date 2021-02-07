import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Task } from 'src/app/services/models';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent implements OnInit, OnDestroy {
  task: any;
  taskSubscription: any;
  id: any;
  assignedTo: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public taskService: TaskService,
    private auth: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )
    this.taskSubscription = this.taskService.getById(this.id).subscribe((task: any) => {
      this.task = task;
      this.auth.getById(task.assignee).subscribe((user: any) => {
        this.assignedTo = user.displayName;
      })
    })
    
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }

}

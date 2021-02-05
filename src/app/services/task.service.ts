import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User, Task } from './models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  user: any;
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe((user: User) => {
      this.user = user.displayName;
    })
  }

  createTask(task?: Task) {
    const taskData = {
      title: task?.title ||'Default title',
      assignee: task?.assignee || this.user,
      owner:  this.user,
      description: task?.description || 'Default descr',
      createdDate: Date.now(),
      status: 'todo'
    }
    const taskRef = this.db.collection("tasks").doc();
    return taskRef.set(taskData, { merge: true});
  }
}

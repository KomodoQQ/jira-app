import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User, Task } from './models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  user: any;
  tasks$: any;
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe((user: User) => {
      this.user = user.displayName;
    })
    this.tasks$ = this.db.collection('tasks').valueChanges();
  }

  createTask(task?: Task) {
    const taskData = {
      taskId: this.db.createId(),
      title: task?.title ||'Default title',
      assignee: task?.assignee || this.user,
      owner:  this.user,
      description: task?.description || 'Default descr',
      createdDate: Date.now(),
      status: 'todo'
    }
    
    const taskRef = this.db.collection("tasks").doc(taskData.taskId);
    return taskRef.set(taskData, { merge: true});
  }

  updateTaskData(task: any) {
    const taskRef: AngularFirestoreDocument<Task> = this.db.doc(`tasks/${task.taskId}`);
    const data = {
      ...task
    }
    return taskRef.set(data, { merge: true });
  }

  deleteTask(task: any) {
    this.db.doc(`tasks/${task.taskId}`).delete()
      .then()
      .catch(err => {
        console.log(err.message);
      })
  }
}

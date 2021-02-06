import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Task, User } from 'src/app/services/models';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  form!: FormGroup;
  user: any;
  users: any;

  constructor(public task: TaskService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((user: any) => {
      this.user = user;
    })
    this.auth.users$.subscribe((users: any) => {
      this.users = users;
    });
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      assignee: new FormControl(null),
      description: new FormControl(null),
    });
  }

  submit() {
    if(this.form.invalid) {
      return false;
    }
    const task: any = {
      title: this.form.value.title,
      assignee: this.form.value.assignee,
      description: this.form.value.description
    }

    this.task.createTask(task)
      .then(() => {
        this.router.navigate(['/board']);
      })
      .catch((err) => {
        console.log(err.message);
      })
    return;
  }

}

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/services/models';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks = [];
  // todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];
  todo: any;
  done: any;
  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];
  constructor(public taskService: TaskService) {

  }
  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks: any) => {
      this.tasks = tasks;
      console.log(tasks);
      this.todo = this.tasks.filter((task: any) => {
        return task.status == 'todo';
      })
      this.done = this.tasks.filter((task: any) => {
        return task.status == 'done';
      })
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex = 0);
      }
      let newTaskData: Task = Object(event.container.data[0]);
      newTaskData.status = event.container.id;

      this.taskService.updateTaskData(newTaskData);
    }
}

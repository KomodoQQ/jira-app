import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { BoardComponent } from './pages/board/board.component';
import { LoginComponent } from './pages/login/login.component';
import { TaskInfoComponent } from './pages/task-info/task-info.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, 
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'board', pathMatch: 'full'},
      { path: 'board', component: BoardComponent},
      { path: 'create-task', component: AddTaskComponent},
      { path: 'task/:id', component: TaskInfoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

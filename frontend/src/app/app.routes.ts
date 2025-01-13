import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListPageComponent } from './list-page/list-page.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SearchTaskComponent } from './search-task/search-task.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: ListPageComponent, canActivate: [AuthGuard] },
  { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard] },
  { path: 'edit-task/:id', component: EditTaskComponent, canActivate: [AuthGuard] },
  { path: 'search-task', component: SearchTaskComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { TaskDto } from '../_generated-sources/api/models/task-dto';
import { TaskControllerService } from '../_generated-sources/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  tasks$!: Observable<TaskDto[]>;

  constructor(
    private taskService: TaskControllerService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshTasks();
  }

  refreshTasks(): void {
    this.tasks$ = this.auth.isLoggedIn$.pipe(
      switchMap(isLoggedIn => (isLoggedIn ? this.taskService.getAll() : of([])))
    );
  }

  editTask(id: number): void {
    this.router.navigate(['/edit-task', id]);
  }

  deleteTask(id: number): void {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }
    this.taskService.delete({ id }).subscribe({
      next: () => this.refreshTasks(),
      error: err => console.error('Error deleting task:', err)
    });
  }
}

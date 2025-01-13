import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { TaskControllerService } from '../_generated-sources/api';
import { TaskDto } from '../_generated-sources/api/models/task-dto';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search-task',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatTableModule],
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.scss']
})
export class SearchTaskComponent {
  searchQuery = '';
  errorMessage = '';
  tasks$: Observable<TaskDto[]> = of([]);
  displayedColumns = ['id', 'title', 'description', 'edit', 'delete'];
  searched: boolean = false;

  constructor(
    private taskService: TaskControllerService,
    private router: Router
  ) {}

  onSearch(): void {
    this.searched = true;
    if (!this.searchQuery.trim()) {
      this.tasks$ = of([]);
      return;
    }
    this.taskService.searchTasks({ query: this.searchQuery }).pipe(
      catchError(err => {
        this.errorMessage = 'Error performing search: ' + err.message;
        return of([]);
      })
    ).subscribe(tasks => {
      this.tasks$ = of(tasks);
    });
  }

  editTask(id: number): void {
    this.router.navigate(['/edit-task', id]);
  }

  deleteTask(id: number): void {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }
    this.taskService.delete({ id }).subscribe({
      next: () => this.onSearch(),
      error: err => console.error('Error deleting task:', err)
    });
  }

  goToList(): void {
    this.router.navigate(['/tasks']);
  }
}

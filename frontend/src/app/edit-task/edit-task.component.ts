import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TaskControllerService } from '../_generated-sources/api';
import { TaskDto } from '../_generated-sources/api/models/task-dto';
import { TaskSaveRequest } from '../_generated-sources/api/models/task-save-request';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  id!: number;
  title = '';
  description = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskControllerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.taskService.getById({ id: this.id }).pipe(
          catchError(err => {
            this.errorMessage = 'Could not load task';
            return of(null);
          })
        ).subscribe((task: TaskDto | null) => {
          if (task) {
            this.title = task.title || '';
            this.description = task.description || '';
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (!this.title) {
      this.errorMessage = 'Title is required!';
      return;
    }

    const request: TaskSaveRequest = {
      title: this.title,
      description: this.description
    };

    this.taskService.update({ id: this.id, body: request }).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.errorMessage = 'Error updating task: ' + err.message;
      }
    });
  }
}

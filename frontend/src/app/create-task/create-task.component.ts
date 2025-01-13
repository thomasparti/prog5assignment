import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TaskControllerService } from '../_generated-sources/api';
import { TaskSaveRequest } from '../_generated-sources/api/models/task-save-request';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  title = '';
  description = '';
  errorMessage = '';

  constructor(
    private taskService: TaskControllerService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.title) {
      this.errorMessage = 'Title is required!';
      return;
    }

    const request: TaskSaveRequest = {
      title: this.title,
      description: this.description
    };

    this.taskService.create({ body: request }).subscribe({
      next: (result) => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.errorMessage = 'Error creating task: ' + err.message;
      }
    });
  }
}

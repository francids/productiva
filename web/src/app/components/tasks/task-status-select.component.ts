import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { Task } from "../../models/task.model";

@Component({
  selector: 'task-status-select',
  template: `
  <mat-select [value]="task.status" (selectionChange)="onStatusChange($event.value)"
  [class.no-started]="task.status === 0"
  [class.in-progress]="task.status === 1"
  [class.completed]="task.status === 2"
  class="task-status-select">
    <mat-option [value]="0">No iniciado</mat-option>
    <mat-option [value]="1">En progreso</mat-option>
    <mat-option [value]="2">Completado</mat-option>
  </mat-select>
  `,
  imports: [MatSelectModule]
})
export class TaskStatusSelectComponent {
  @Input({ required: true }) task!: Task;
  @Output() statusChange = new EventEmitter<Task["status"]>();

  onStatusChange(status: Task["status"]) {
    this.statusChange.emit(status);
    this.task.status = status;
  }
}
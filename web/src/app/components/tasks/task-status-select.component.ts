import { Component, input, output } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { Task } from "../../models/task.model";

@Component({
  selector: "task-status-select",
  template: `
    <mat-select
      [value]="task().status"
      (selectionChange)="onStatusChange($event.value)"
      [class.no-started]="task().status === 0"
      [class.in-progress]="task().status === 1"
      [class.completed]="task().status === 2"
      class="task-status-select"
    >
      <mat-option [value]="0" i18n="@@tasks.not-started"
        >No iniciado</mat-option
      >
      <mat-option [value]="1" i18n="@@tasks.in-progress"
        >En progreso</mat-option
      >
      <mat-option [value]="2" i18n="@@tasks.completed">Completado</mat-option>
    </mat-select>
  `,
  imports: [MatSelectModule],
})
export class TaskStatusSelectComponent {
  task = input.required<Task>();
  statusChange = output<Task["status"]>();

  onStatusChange(status: Task["status"]) {
    this.statusChange.emit(status);
  }
}

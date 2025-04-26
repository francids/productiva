// Angular
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Services
import { TasksService } from '../../services/tasks.service';
import { TitleService } from '../../services/title.service';

// Material Components
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Utils
import { v4 as uuidv4 } from 'uuid';

// Models
import { Task } from '../../models/task.model';

// Dialogs
import { NewTaskDialogComponent } from '../../components/tasks/new-task-dialog.component';
import { EditTaskDialogComponent } from '../../components/tasks/edit-task-dialog.component';
import { DelTaskDialogComponent } from '../../components/tasks/del-task-dialog.component';
import { TaskStatusSelectComponent } from "../../components/tasks/task-status-select.component";

@Component({
  selector: 'tasks-page',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  imports: [MatTableModule, MatSelectModule, FormsModule, MatButtonModule, MatIconModule, MatSortModule, TaskStatusSelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements AfterViewInit {
  tasks = signal<Task[]>([]);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(
    private tasksService: TasksService,
    private titleService: TitleService,
  ) { }

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["title", "description", "status", "actions"];

  ngAfterViewInit() {
    this.tasksService.tasks$.subscribe((tasks: Task[]) => {
      this.tasks.set(tasks);
      this.dataSource.data = tasks;
    });
    Promise.resolve().then(() => {
      this.titleService.updateTitle($localize`:@@tasks:Tareas`);
    });
  }

  private async createTask(title: string, description: string): Promise<void> {
    const newTaskId = uuidv4();
    await this.tasksService.createTask({
      id: newTaskId,
      title,
      description,
      status: 0,
    });
  }

  async updateTaskStatus(task: Task, status: Task["status"]): Promise<void> {
    task.status = status;
    await this.updateTask(task);
  }

  private async updateTask(task: Task): Promise<void> {
    await this.tasksService.updateTask(task);
  }

  openDialogCreateTask() {
    const dialogRef = this.dialog.open(
      NewTaskDialogComponent,
      {
        data: {
          title: "",
          description: "",
        },
      },
    );

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.createTask(result.title, result.description);
      }
    });
  }

  openDialogEditTask(task: Task) {
    const dialogRef = this.dialog.open(
      EditTaskDialogComponent,
      {
        data: {
          title: task.title,
          description: task.description,
        },
      },
    );

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        task.title = result.title;
        task.description = result.description;
        await this.updateTask(task);
      }
    });
  }

  openDialogDeleteTask(taskId: string) {
    const dialogRef = this.dialog.open(
      DelTaskDialogComponent,
      {
        data: taskId,
      },
    );

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.tasksService.deleteTask(taskId);
        this._snackBar.open(
          $localize`:@@tasks.task-deleted:Tarea eliminada`,
          $localize`:@@common.ok:Cerrar`, {
          duration: 2000,
        });
      }
    });
  }
};

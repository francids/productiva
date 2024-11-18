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
import { DelTaskDialogComponent } from '../../components/tasks/del-task-dialog.component';

@Component({
  selector: 'tasks-page',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  imports: [MatTableModule, MatSelectModule, FormsModule, MatButtonModule, MatIconModule, MatSortModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements AfterViewInit {
  tasks = signal<Task[]>([]);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

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
      this.titleService.updateTitle("Tareas");
    });
    this.dataSource.sort = this.sort;
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
        this._snackBar.open("Tarea eliminada", "Cerrar", {
          duration: 2000,
        });
      }
    });
  }
};

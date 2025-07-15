// Angular
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  effect,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

// Services
import { TasksService } from "../../services/tasks.service";
import { TitleService } from "../../services/title.service";

// Material Components
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

// Utils
import { v4 as uuidv4 } from "uuid";

// Models
import { Task } from "../../models/task.model";

// Dialogs
import { NewTaskDialogComponent } from "../../components/tasks/new-task-dialog.component";
import { EditTaskDialogComponent } from "../../components/tasks/edit-task-dialog.component";
import { DelTaskDialogComponent } from "../../components/tasks/del-task-dialog.component";
import { TaskStatusSelectComponent } from "../../components/tasks/task-status-select.component";

@Component({
  selector: "tasks-page",
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
  imports: [
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    TaskStatusSelectComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TasksComponent {
  private readonly titleService = inject(TitleService);
  private readonly tasksService = inject(TasksService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource().sort = sort;
  }

  readonly tasks = this.tasksService.tasks;
  readonly dataSource = signal(new MatTableDataSource<Task>([]));
  readonly displayedColumns = ["title", "description", "status", "actions"];

  constructor() {
    this.titleService.updateTitle($localize`:@@tasks:Tareas`);
    effect(() => {
      this.dataSource().data = this.tasks();
    });
  }

  async createTask(title: string, description: string): Promise<void> {
    await this.tasksService.createTask({
      id: uuidv4(),
      title,
      description,
      status: 0,
    });
  }

  async updateTaskStatus(task: Task, status: Task["status"]): Promise<void> {
    await this.tasksService.updateTask({ ...task, status });
  }

  async updateTask(task: Task): Promise<void> {
    await this.tasksService.updateTask(task);
  }

  openDialogCreateTask() {
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      data: { title: "", description: "" },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.createTask(result.title, result.description);
      }
    });
  }

  openDialogEditTask(task: Task) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: { title: task.title, description: task.description },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.updateTask({ ...task, ...result });
      }
    });
  }

  openDialogDeleteTask(taskId: string) {
    const dialogRef = this.dialog.open(DelTaskDialogComponent, {
      data: taskId,
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.tasksService.deleteTask(taskId);
        this.snackBar.open(
          $localize`:@@tasks.task-deleted:Tarea eliminada`,
          $localize`:@@common.ok:Cerrar`,
          { duration: 2000 }
        );
      }
    });
  }
}

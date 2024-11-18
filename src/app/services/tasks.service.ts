import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Task } from "../models/task.model";
import { DexieService } from "./db.service";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private dexieService: DexieService) {
    this.loadTasks();
  }

  private async loadTasks(): Promise<void> {
    const tasks = await this.dexieService.db.tasks.toArray();
    this.tasksSubject.next(tasks);
  }

  async createTask(task: Task): Promise<void> {
    await this.dexieService.db.tasks.put(task);
    this.loadTasks();
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.dexieService.db.tasks.delete(taskId);
    this.loadTasks();
  }
}

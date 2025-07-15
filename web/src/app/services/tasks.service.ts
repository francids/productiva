import type { Task } from "../models/task.model";
import { signal, effect, computed, inject, Injectable } from "@angular/core";
import { DexieService } from "./db.service";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private readonly dexieService = inject(DexieService);
  private readonly _tasks = signal<Task[]>([]);

  readonly tasks = computed(() => this._tasks());

  constructor() {
    effect(() => {
      this.loadTasks();
    });
  }

  private async loadTasks(): Promise<void> {
    const tasks = await this.dexieService.db.tasks.toArray();
    this._tasks.set(tasks);
  }

  async createTask(task: Task): Promise<void> {
    await this.dexieService.db.tasks.put(task);
    await this.loadTasks();
  }

  async updateTask(task: Task): Promise<void> {
    await this.dexieService.db.tasks.update(task.id, task);
    await this.loadTasks();
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.dexieService.db.tasks.delete(taskId);
    await this.loadTasks();
  }
}

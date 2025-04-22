import { DexieService } from "../../app/services/db.service";
import { TasksService } from "../../app/services/tasks.service";
import { Task } from "../../app/models/task.model";
import { firstValueFrom } from "rxjs";

describe("TasksService", () => {
  let service: TasksService;
  let mockDexieService: jasmine.SpyObj<DexieService>;
  let mockDb: any;
  let mockTasks: Task[];

  beforeEach(async () => {
    mockTasks = [
      { id: "1", title: "Tarea 1", description: "Descripción 1", status: 0 },
      { id: "2", title: "Tarea 2", description: "Descripción 2", status: 1 }
    ];

    mockDb = {
      tasks: {
        toArray: jasmine.createSpy("toArray").and.callFake(() => {
          return Promise.resolve([...mockTasks]);
        }),
        get: jasmine.createSpy("get").and.callFake((id: string) => {
          const task = mockTasks.find(t => t.id === id);
          return Promise.resolve(task);
        }),
        put: jasmine.createSpy("put").and.resolveTo(),
        update: jasmine.createSpy("update").and.resolveTo({}),
        delete: jasmine.createSpy("delete").and.resolveTo()
      }
    };

    mockDexieService = jasmine.createSpyObj("DexieService", [], { db: mockDb });

    service = new TasksService(mockDexieService);
    await new Promise<void>(resolve => setTimeout(resolve, 0));
  });

  it("should create the service", () => {
    expect(service).toBeTruthy();
  });

  it("should load tasks on initialization", async () => {
    expect(mockDb.tasks.toArray).toHaveBeenCalledTimes(1);

    const tasks = await firstValueFrom(service.tasks$);
    expect(tasks.length).toBe(2);
    expect(tasks[0]).toEqual(mockTasks[0]);
    expect(tasks[1]).toEqual(mockTasks[1]);
  });

  it("should save a task and reload tasks", async () => {
    const newTask: Task = {
      id: "3",
      title: "Nueva tarea",
      description: "Nueva descripción",
      status: 0
    };

    await service.createTask(newTask);

    expect(mockDb.tasks.put).toHaveBeenCalledWith(newTask);
    expect(mockDb.tasks.toArray).toHaveBeenCalledTimes(2);
  });

  it("should update a task and reload tasks", async () => {
    const taskId = "1";
    const updatedTask: Task = {
      id: taskId,
      title: "Tarea actualizada",
      description: "Descripción actualizada",
      status: 2
    };

    await service.updateTask(updatedTask);

    expect(mockDb.tasks.update).toHaveBeenCalledWith(taskId, updatedTask);
    expect(mockDb.tasks.toArray).toHaveBeenCalledTimes(2);
  });

  it("should delete a task and reload tasks", async () => {
    const taskId = "2";

    await service.deleteTask(taskId);

    expect(mockDb.tasks.delete).toHaveBeenCalledWith(taskId);
    expect(mockDb.tasks.toArray).toHaveBeenCalledTimes(2);
  });
});

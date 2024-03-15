import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }
  createTask({ title, description }: CreateTaskDto) {
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    return task;
  }
  deleteTaskById(id: string): string {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return 'task deleted';
  }
  updateTask(id: string, status: TaskStatus): Task {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      this.tasks[index].status = status;
    }
    return this.tasks[index];
  }
}

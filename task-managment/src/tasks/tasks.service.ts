import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-task-filter-dto';
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
  getTasksWithFilter(getTasksFilterDto: GetTasksFilterDto) {
    const { search, status } = getTasksFilterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search)) {
          return true;
        }
        if (task.description.includes(search)) {
          return true;
        }
      });
    }
    return tasks;
  }
}

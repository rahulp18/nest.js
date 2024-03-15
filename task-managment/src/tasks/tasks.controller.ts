import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-task-filter-dto';
import { UpdateTaskDto } from './dto/update-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      // call filter function
      return this.tasksService.getTasksWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const task = this.tasksService.createTask(createTaskDto);
    return task;
  }
  @Get('/:id')
  getTaskById(@Param() params: any) {
    return this.tasksService.getTaskById(params.id);
  }
  @Delete('/:id')
  deleteTask(@Param() params: any) {
    return this.tasksService.deleteTaskById(params.id);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskDto,
  ) {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTask(id, status);
  }
}

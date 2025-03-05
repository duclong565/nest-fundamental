import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './entity/tasks.repository';
import { Task } from './entity/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FolderRepository } from 'src/folders/entities/folder.repository';

@Injectable()
export class TasksService {
  constructor(
    private taskRepository: TaskRepository,
    private folderRepository: FolderRepository,
  ) {}

  async getTasks(): Promise<Task[]> {
    try {
      return await this.taskRepository.getTasks();
    } catch (err) {
      throw new InternalServerErrorException('Không thể lấy task o service');
    }
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneById(id);

    if (!found) {
      throw new NotFoundException(`Khong tim thay id ${id}!`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const folder = await this.folderRepository.findOneFolder(
        createTaskDto.folderId,
      );

      if (!folder) {
        throw new NotFoundException(
          `Không tìm thấy folder ${createTaskDto.folderId}`,
        );
      }

      const task = await this.taskRepository.createTask(createTaskDto);

      folder.taskOrderIds = [...(folder.taskOrderIds || []), task.id];
      await this.folderRepository.updateFolder(folder.id, {
        taskOrderIds: folder.taskOrderIds,
      });

      return task;
    } catch (err) {
      throw new InternalServerErrorException('Không thể tạo task o service');
    }
  }

  async deleteTaskById(id: string): Promise<void> {
    try {
      const found = await this.taskRepository.findOneById(id);

      if (!found) {
        throw new NotFoundException(`Khong tim thay id ${id}!`);
      }

      await this.taskRepository.deleteTask(id);
    } catch (err) {
      throw new InternalServerErrorException('Không thể xóa task o service');
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const { title, description, status } = updateTaskDto;

      const found = await this.taskRepository.findOneById(id);

      if (!found) {
        throw new NotFoundException(`Không tìm thấy id ${id}`);
      }

      //Khi sử dụng phương thức save() của TypeORM, các trường có giá trị undefined sẽ ko dc cập nhật
      if (title !== undefined) found.title = title;
      if (description !== undefined) found.description = description;
      if (status !== undefined) found.status = status;

      return await this.taskRepository.updateTask(found);
    } catch (err) {
      throw new InternalServerErrorException('Không thể update task o service');
    }
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    try {
      return await this.taskRepository.findTaskWithFilter(filterDto);
    } catch (err) {
      throw new InternalServerErrorException('Không thể lấy task o service');
    }
  }

  async getTasksByFolder(folderId: string): Promise<Task[]> {
    try {
      const folder = await this.folderRepository.findOneFolder(folderId);
      if (!folder) {
        throw new NotFoundException(`Không tìm thấy folder ${folderId}`);
      }

      return await this.taskRepository.findTasksByIds(folder.taskOrderIds || []);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Không thể lấy tasks theo folder');
    }
  }

}

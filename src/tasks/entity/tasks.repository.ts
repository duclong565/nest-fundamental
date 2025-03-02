/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../tasks-status.enum';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(): Promise<Task[]> {
    try {
      return await this.taskRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Không thể lấy task repo');
    }
  }

  async findOneById(id: string): Promise<Task> {
    try {
      return await this.taskRepository.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Không tìm thấy id ${id}`);
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { title, description, folderId } = createTaskDto;
      return await this.taskRepository.save({
        title,
        description,
        folderId,
        status: TaskStatus.OPEN,
      });
    } catch (error) {
      throw new InternalServerErrorException('Không thể tạo task repo');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.taskRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException('Không thể xóa task repo');
    }
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      return await this.taskRepository.save(updateTaskDto);
    } catch (error) {
      throw new InternalServerErrorException('Không thể update task repo');
    }
  }

  async findTaskWithFilter(filterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task'); //task là tên bảng

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    try {
      return await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException('Không thể lấy task repo');
    }
  }
}

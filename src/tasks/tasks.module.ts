import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './entity/tasks.repository';
import { Task } from './entity/task.entity';
import { FoldersModule } from 'src/folders/folders.module';

@Module({
  /* forFeature() method to define which repositories are registered 
  in the current scope
   */
  imports: [TypeOrmModule.forFeature([Task]), FoldersModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}

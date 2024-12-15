import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './entity/tasks.repository';
import { Task } from './entity/task.entity';

@Module({
  /* forFeature() method to define which repositories are registered 
  in the current scope//forFeature() method to define which repositories 
  are registered in the current scope
   */
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}

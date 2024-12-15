import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

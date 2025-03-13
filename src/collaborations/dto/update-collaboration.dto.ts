import { IsEnum, IsOptional } from 'class-validator';
import {
  CollaborationRole,
  CollaborationStatus,
} from '../enum/collaboration.enum';

export class UpdateCollaborationDto {
  @IsOptional()
  @IsEnum(CollaborationRole)
  role?: CollaborationRole;

  @IsOptional()
  @IsEnum(CollaborationStatus)
  status?: CollaborationStatus;
}

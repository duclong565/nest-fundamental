import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CollaborationRole } from '../enum/collaboration.enum';

export class CreateCollaborationDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  folderId: string;

  @IsNotEmpty()
  invitedBy: string;

  @IsOptional()
  @IsEnum(CollaborationRole)
  role?: CollaborationRole;
}

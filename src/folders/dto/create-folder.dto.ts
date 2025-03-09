import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateFolderDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  userId: string;
}

import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  username: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  password: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  email: string;

  @IsOptional()
  folderOrderIds: string[];
}

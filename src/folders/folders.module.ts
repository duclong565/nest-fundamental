import { forwardRef, Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FolderRepository } from './entities/folder.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), forwardRef(() => UsersModule)],
  controllers: [FoldersController],
  providers: [FoldersService, FolderRepository],
  exports: [FolderRepository, FoldersService],
})
export class FoldersModule {}

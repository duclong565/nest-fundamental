import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FolderRepository } from './entities/folder.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folder])],
  controllers: [FoldersController],
  providers: [FoldersService, FolderRepository],
})
export class FoldersModule {}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './folder.entity';
import { Repository } from 'typeorm';
import { CreateFolderDto } from '../dto/create-folder.dto';

@Injectable()
export class FolderRepository {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  async createFolder(createFolderDto: CreateFolderDto): Promise<Folder> {
    try {
      const { title } = createFolderDto;
      return await this.folderRepository.save({ title, taskOrderIds: [] });
    } catch (error) {
      throw new InternalServerErrorException('Không thể tạo folder repo');
    }
  }

  async findAllFolders(): Promise<Folder[]> {
    try {
      return await this.folderRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Không thể lấy folder repo');
    }
  } 
}

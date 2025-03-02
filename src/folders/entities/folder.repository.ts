import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './folder.entity';
import { Repository } from 'typeorm';
import { CreateFolderDto } from '../dto/create-folder.dto';
import { UpdateFolderDto } from '../dto/update-folder.dto';

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
      throw new InternalServerErrorException(
        'Không thể tạo folder repo',
        error,
      );
    }
  }

  async findAllFolders(): Promise<Folder[]> {
    try {
      return await this.folderRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể lấy folder repo',
        error,
      );
    }
  }

  async findOneFolder(id: string): Promise<Folder> {
    try {
      return await this.folderRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể lấy folder repo',
        error,
      );
    }
  }

  async updateFolder(
    id: string,
    updateFolderDto: UpdateFolderDto,
  ): Promise<Folder> {
    try {
      const { title, taskOrderIds } = updateFolderDto;
      return await this.folderRepository.save({ id, title, taskOrderIds });
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể update folder repo',
        error,
      );
    }
  }

  async deleteFolder(id: string): Promise<void> {
    try {
      await this.folderRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể xóa folder repo',
        error,
      );
    }
  }
}

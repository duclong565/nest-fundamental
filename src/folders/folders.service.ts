import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';
import { FolderRepository } from './entities/folder.repository';

@Injectable()
export class FoldersService {
  private logger = new Logger('FoldersService');

  constructor(private folderRepository: FolderRepository) {}

  async createFolder(createFolderDto: CreateFolderDto): Promise<Folder> {
    try {
      return await this.folderRepository.createFolder(createFolderDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể tạo folder service',
        error,
      );
    }
  }

  async findAllFolders(): Promise<Folder[]> {
    try {
      return await this.folderRepository.findAllFolders();
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể lấy folder service',
        error,
      );
    }
  }

  async findOneFolder(id: string): Promise<Folder> {
    try {
      return await this.folderRepository.findOneFolder(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể lấy folder service',
        error,
      );
    }
  }

  async updateFolder(id: string, updateFolderDto: UpdateFolderDto) {
    const { title } = updateFolderDto;
    try {
      return await this.folderRepository.updateFolder(id, { title });
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể update folder service',
        error,
      );
    }
  }

  async deleteFolder(id: string): Promise<void> {
    try {
      // Kiểm tra folder tồn tại
      const folder = await this.folderRepository.findOneFolder(id);
      if (!folder) {
        throw new NotFoundException(`Folder với id ${id} không tồn tại`);
      }

      // Thử xóa folder
      await this.folderRepository.deleteFolder(id);
    } catch (error) {
      this.logger.error(
        `Failed to delete folder: ${error.message}`,
        error.stack,
      );

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Không thể xóa folder service: ${error.message}`,
      );
    }
  }
}

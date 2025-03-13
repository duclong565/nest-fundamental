import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';
import { FolderRepository } from './entities/folder.repository';
import { UserRepository } from 'src/users/entity/user.repository';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FoldersService {
  private logger = new Logger('FoldersService');

  constructor(
    private folderRepository: FolderRepository,
    @Inject(forwardRef(() => UserRepository))
    private userRepo: UserRepository,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}

  async createFolder(createFolderDto: CreateFolderDto): Promise<Folder> {
    try {
      const user = await this.userRepo.findOne(createFolderDto.userId);
      // this.logger.debug(`Found user: ${JSON.stringify(user)}`);

      if (!user) {
        throw new NotFoundException(
          `Không tìm thấy user ${createFolderDto.userId}`,
        );
      }

      const folder = await this.folderRepository.createFolder(createFolderDto);
      // this.logger.debug(`Created folder: ${JSON.stringify(folder)}`);

      const newFolderOrderIds = [folder.id, ...(user.folderOrderIds || [])];
      await this.userService.updateFolderOrderIds(user.id, newFolderOrderIds);

      return folder;
    } catch (error) {
      this.logger.error(
        `Failed to create folder: ${error.message}`,
        error.stack,
      );
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Không thể tạo folder service: ${error.message}`,
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

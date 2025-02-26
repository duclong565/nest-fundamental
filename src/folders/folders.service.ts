import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';
import { FolderRepository } from './entities/folder.repository';

@Injectable()
export class FoldersService {
  constructor(private folderRepository: FolderRepository) {}

  async createFolder(createFolderDto: CreateFolderDto): Promise<Folder> {
    try {
      return await this.folderRepository.createFolder(createFolderDto);
    } catch (error) {
      throw new InternalServerErrorException('Không thể tạo folder service');
    }
  }

  async findAllFolders(): Promise<Folder[]> {
    try {
      return await this.folderRepository.findAllFolders();
    } catch (error) {
      throw new InternalServerErrorException('Không thể lấy folder service');
    }
  }

  // findOneFolder(id: number) {
  //   return `This action returns a #${id} folder`;
  // }

  // updateFolder(id: number, updateFolderDto: UpdateFolderDto) {
  //   return `This action updates a #${id} folder`;
  // }

  // removeFolder(id: number) {
  //   return `This action removes a #${id} folder`;
  // }
}

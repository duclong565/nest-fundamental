import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  createFolder(@Body() createFolderDto: CreateFolderDto): Promise<Folder> {
    return this.foldersService.createFolder(createFolderDto);
  }

  @Get()
  findAllFolders(): Promise<Folder[]> {
    return this.foldersService.findAllFolders();
  }

  // @Get(':id')
  // findOneFolder(@Param('id') id: string) {
  //   return this.foldersService.findOne(+id);
  // }

  // @Patch(':id')
  // updateFolder(
  //   @Param('id') id: string,
  //   @Body() updateFolderDto: UpdateFolderDto,
  // ) {
  //   return this.foldersService.update(+id, updateFolderDto);
  // }

  // @Delete(':id')
  // removeFolder(@Param('id') id: string) {
  //   return this.foldersService.remove(+id);
  // }
}

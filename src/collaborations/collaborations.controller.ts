import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { Collaboration } from './entity/collaborations.entity';
import { CreateCollaborationDto } from './dto/create-collaboration.dto';
import { UpdateCollaborationDto } from './dto/update-collaboration.dto';

@Controller('collaborations')
export class CollaborationsController {
  constructor(private readonly collaborationsService: CollaborationsService) {}

  @Get()
  getAllCollaborations(): Promise<Collaboration[]> {
    return this.collaborationsService.getAllCollaborations();
  }

  @Get('/:id')
  getCollaborationById(@Param('id') id: string): Promise<Collaboration> {
    return this.collaborationsService.getCollaborationById(id);
  }

  @Get('/user/:userId')
  getCollaborationsByUserId(
    @Param('userId') userId: string,
  ): Promise<Collaboration[]> {
    return this.collaborationsService.getCollaborationsByUserId(userId);
  }

  @Get('/folder/:folderId')
  getCollaborationsByFolderId(
    @Param('folderId') folderId: string,
  ): Promise<Collaboration[]> {
    return this.collaborationsService.getCollaborationsByProjectId(folderId);
  }

  @Post()
  createCollaboration(
    @Body(ValidationPipe) createCollaborationDto: CreateCollaborationDto,
  ): Promise<Collaboration> {
    return this.collaborationsService.createCollaboration(
      createCollaborationDto,
    );
  }

  @Patch('/:id')
  updateCollaboration(
    //Validation pipe is used to validate the incoming request body using passed DTO
    @Param('id') id: string,
    @Body(ValidationPipe) updateCollaborationDto: UpdateCollaborationDto,
  ): Promise<Collaboration> {
    return this.collaborationsService.updateCollaboration(
      id,
      updateCollaborationDto,
    );
  }

  @Delete('/:id')
  deleteCollaboration(@Param('id') id: string): Promise<boolean> {
    return this.collaborationsService.deleteCollaboration(id);
  }
}

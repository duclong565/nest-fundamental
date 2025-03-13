import { Controller, Get } from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { Collaboration } from './entity/collaborations.entity';

@Controller('collaborations')
export class CollaborationsController {
  constructor(private readonly collaborationsService: CollaborationsService) {}

  @Get()
  getAllCollaborations(): Promise<Collaboration[]> {
    return this.collaborationsService.getAllCollaborations();
  }
}

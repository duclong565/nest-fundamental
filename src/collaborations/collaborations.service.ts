import { Injectable } from '@nestjs/common';
import { CollaborationRepository } from './entity/collaborations.repository';

@Injectable()
export class CollaborationsService {
  constructor(private collaborationRepository: CollaborationRepository) {}

  async getAllCollaborations() {
    return this.collaborationRepository.getAllCollaborations();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CollaborationRepository } from './entity/collaborations.repository';
import { CreateCollaborationDto } from './dto/create-collaboration.dto';
import { UpdateCollaborationDto } from './dto/update-collaboration.dto';
import { Collaboration } from './entity/collaborations.entity';

@Injectable()
export class CollaborationsService {
  constructor(private collaborationRepository: CollaborationRepository) {}

  async getAllCollaborations(): Promise<Collaboration[]> {
    return this.collaborationRepository.getAllCollaborations();
  }

  async getCollaborationById(id: string): Promise<Collaboration> {
    const collaboration =
      await this.collaborationRepository.getCollaborationById(id);
    if (!collaboration) {
      throw new NotFoundException(`Collaboration with ID "${id}" not found`);
    }
    return collaboration;
  }

  async createCollaboration(
    createCollaborationDto: CreateCollaborationDto,
  ): Promise<Collaboration> {
    return this.collaborationRepository.createCollaboration(
      createCollaborationDto,
    );
  }

  async updateCollaboration(
    id: string,
    updateCollaborationDto: UpdateCollaborationDto,
  ): Promise<Collaboration> {
    const collaboration = await this.getCollaborationById(id);

    if (!collaboration) {
      throw new NotFoundException(`Collaboration with ID "${id}" not found`);
    }

    return this.collaborationRepository.updateCollaboration(
      id,
      updateCollaborationDto,
    );
  }

  async deleteCollaboration(id: string) {
    const result = await this.collaborationRepository.deleteCollaboration(id);
    if (!result) {
      throw new NotFoundException(`Collaboration with ID "${id}" not found`);
    }
    return result;
  }

  async getCollaborationsByProjectId(folderId: string) {
    return this.collaborationRepository.getCollaborationsByFolder(folderId);
  }

  async getCollaborationsByUserId(userId: string) {
    return this.collaborationRepository.getCollaborationsByUser(userId);
  }
}

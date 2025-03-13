import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaboration } from './collaborations.entity';
import { Repository } from 'typeorm';
import { CreateCollaborationDto } from '../dto/create-collaboration.dto';
import {
  CollaborationRole,
  CollaborationStatus,
} from '../enum/collaboration.enum';
import { UpdateCollaborationDto } from '../dto/update-collaboration.dto';

@Injectable()
export class CollaborationRepository {
  constructor(
    @InjectRepository(Collaboration)
    private readonly collaborationRepository: Repository<Collaboration>,
  ) {}

  async getAllCollaborations(): Promise<Collaboration[]> {
    try {
      return await this.collaborationRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve collaborations',
        error.message,
      );
    }
  }

  async getCollaborationById(id: string): Promise<Collaboration> {
    try {
      const collaboration = await this.collaborationRepository.findOne({
        where: { id },
      });

      if (!collaboration) {
        throw new NotFoundException(`Collaboration with ID ${id} not found`);
      }

      return collaboration;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to retrieve collaboration: ${error.message}`,
      );
    }
  }

  async getCollaborationsByUser(userId: string): Promise<Collaboration[]> {
    try {
      return await this.collaborationRepository.find({
        where: { userId },
        relations: ['folder'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve user collaborations: ${error.message}`,
      );
    }
  }

  async getCollaborationsByFolder(folderId: string): Promise<Collaboration[]> {
    try {
      return await this.collaborationRepository.find({
        where: { folderId },
        relations: ['user'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve folder collaborations: ${error.message}`,
      );
    }
  }

  async createCollaboration(
    createCollaborationDto: CreateCollaborationDto,
  ): Promise<Collaboration> {
    try {
      const {
        userId,
        folderId,
        invitedBy,
        role = CollaborationRole.VIEWER,
      } = createCollaborationDto;

      const collaboration = this.collaborationRepository.create({
        userId,
        folderId,
        invitedBy,
        role,
        status: CollaborationStatus.PENDING,
      });

      return await this.collaborationRepository.save(collaboration);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create collaboration: ${error.message}`,
      );
    }
  }

  async updateCollaboration(
    id: string,
    updateCollaborationDto: UpdateCollaborationDto,
  ): Promise<Collaboration> {
    try {
      const collaboration = await this.getCollaborationById(id);

      // Update fields if provided
      if (updateCollaborationDto.role) {
        collaboration.role = updateCollaborationDto.role;
      }

      if (updateCollaborationDto.status) {
        collaboration.status = updateCollaborationDto.status;

        // Set respondedAt when status is changed from PENDING
        if (collaboration.status !== CollaborationStatus.PENDING) {
          collaboration.respondedAt = new Date();
        }
      }

      return await this.collaborationRepository.save(collaboration);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to update collaboration: ${error.message}`,
      );
    }
  }

  async deleteCollaboration(id: string): Promise<void> {
    try {
      const result = await this.collaborationRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Collaboration with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to delete collaboration: ${error.message}`,
      );
    }
  }
}

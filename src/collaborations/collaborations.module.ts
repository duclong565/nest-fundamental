import { Module } from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { CollaborationsController } from './collaborations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaboration } from './entity/collaborations.entity';
import { CollaborationRepository } from './entity/collaborations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Collaboration])],
  controllers: [CollaborationsController],
  providers: [CollaborationsService, CollaborationRepository],
  exports: [CollaborationsService, CollaborationRepository],
})
export class CollaborationsModule {}

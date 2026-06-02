import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { Collaboration } from 'src/collaborations/entity/collaborations.entity';
import { CollaborationStatus } from 'src/collaborations/enum/collaboration.enum';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('/response/:id')
  async responseCollaboration(
    @Param('id') id: string,
    @Query('action') action: string,
  ): Promise<Collaboration> {
    const statusByAction: Record<string, CollaborationStatus> = {
      accept: CollaborationStatus.ACCEPTED,
      reject: CollaborationStatus.REJECTED,
    };

    const status = statusByAction[action];
    if (!status) {
      throw new BadRequestException(
        `Invalid action "${action}". Expected "accept" or "reject".`,
      );
    }

    return this.mailService.updateCollaborationStatus(id, { status });
  }
}

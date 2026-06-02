import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { CollaborationsService } from 'src/collaborations/collaborations.service';

// Avoid opening a real SMTP connection during the test.
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    verify: jest.fn(),
    sendMail: jest.fn(),
  })),
}));

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: CollaborationsService, useValue: {} },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

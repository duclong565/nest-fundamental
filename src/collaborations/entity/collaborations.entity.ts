import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import {
  CollaborationRole,
  CollaborationStatus,
} from '../enum/collaboration.enum';
import { User } from 'src/users/entity/user.entity';
import { Folder } from 'src/folders/entities/folder.entity';

@Entity()
@Unique(['userId', 'folderId'])
export class Collaboration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  folderId: string;

  @Column({
    type: 'enum',
    enum: CollaborationRole,
    default: CollaborationRole.VIEWER,
  })
  role: CollaborationRole;

  @Column({
    type: 'enum',
    enum: CollaborationStatus,
    default: CollaborationStatus.PENDING,
  })
  status: CollaborationStatus;

  @ManyToOne(() => User, (user) => user.collaborations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Folder, (folder) => folder.collaborations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'folderId' })
  folder: Folder;

  @Column({ nullable: true })
  invitedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  respondedAt: Date; //when user response to the invitattion
}

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { TaskStatus } from '../tasks-status.enum';
import { Folder } from 'src/folders/entities/folder.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: TaskStatus;

  @Column()
  folderId: string;

  /* Xác định mối quan hệ, không phải là 1 trường trong bảng
  JoinColumn là để xác định khóa ngoại ở trường folderId */
  @ManyToOne(() => Folder, (folder) => folder.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'folderId' })
  folder: Folder;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

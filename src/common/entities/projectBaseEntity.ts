import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class MyWorkoutBase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

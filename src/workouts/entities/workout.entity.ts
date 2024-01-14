import { MyWorkoutBase } from 'src/common/entities/projectBaseEntity';
import { Program } from 'src/programs/entities/program.entity';
import { Set } from 'src/sets/entities/set.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Workout extends MyWorkoutBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(() => Program)
  program: Program;

  @OneToMany(() => Set, (set) => set.workout)
  @JoinColumn()
  sets: Set[];

  @ManyToOne(() => User)
  user: User;
}

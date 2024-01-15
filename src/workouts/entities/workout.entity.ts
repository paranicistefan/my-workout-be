import { MyWorkoutBase } from 'src/common/entities/projectBaseEntity';
import { Program } from 'src/programs/entities/program.entity';
import { Set } from 'src/sets/entities/set.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Workout extends MyWorkoutBase {
  @ManyToOne(() => Program, { eager: true })
  program: Program;

  @OneToMany(() => Set, (set) => set.workout, { eager: true })
  @JoinColumn()
  sets: Set[];

  @ManyToOne(() => User)
  user: User;

  @Column({
    type: 'boolean',
    name: 'is_arhived',
    default: 'false',
  })
  isArchived: boolean;
}

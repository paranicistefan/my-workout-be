import { Exericse } from 'src/exercises/entities/exercises.entity';
import { Program } from 'src/programs/entities/program.entity';
import { Workout } from 'src/workouts/entities/workout.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: true,
  })
  name?: string;

  @Column({
    type: 'varchar',
    name: 'email',
  })
  email: string;
  @Column({
    type: 'varchar',
    name: 'password',
  })
  password: string;

  @OneToMany(() => Workout, (workout) => workout.user, { nullable: true })
  workouts?: Workout[];

  @OneToMany(() => Program, (program) => program.user, { nullable: true })
  programs?: Program[];

  @OneToMany(() => Exericse, (exercise) => exercise.user, { nullable: true })
  personalExercises?: Exericse[];
}

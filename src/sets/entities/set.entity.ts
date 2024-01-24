import { MyWorkoutBase } from 'src/common/entities/projectBaseEntity';
import { Exericse } from 'src/exercises/entities/exercises.entity';
import { Workout } from 'src/workouts/entities/workout.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Set extends MyWorkoutBase {
  @Column({
    type: 'float',
    name: 'repetitions',
  })
  repetitions: number;
  @Column({
    type: 'float',
    name: 'weight',
  })
  weight: number;

  @ManyToOne(() => Exericse, { eager: true })
  @JoinColumn()
  exercise: Exericse;

  @ManyToOne(() => Workout)
  workout: Workout;
}

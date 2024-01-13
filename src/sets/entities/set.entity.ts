import { MyWorkoutBase } from 'src/common/entities/projectBaseEntity';
import { Exericse } from 'src/exercises/entities/exercises.entity';
import { Workout } from 'src/workouts/entities/workout.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Set extends MyWorkoutBase {
  @Column({
    type: 'integer',
    name: 'repetitions',
  })
  repetitions: number;
  @Column({
    type: 'integer',
    name: 'weight',
  })
  weight: number;

  @OneToOne(() => Exericse)
  @JoinColumn()
  exercise: Exericse;

  @ManyToOne(() => Workout)
  workout: Workout;
}

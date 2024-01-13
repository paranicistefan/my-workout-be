import { MyWorkoutBase } from 'src/common/entities/projectBaseEntity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Exericse extends MyWorkoutBase {
  @Column({
    type: 'varchar',
    name: 'exercise_name',
  })
  name: string;
  @Column({
    type: 'varchar',
    name: 'targeted_groupe',
  })
  targetedGroupe: string;

  @ManyToOne(() => User, (user: User) => user.personalExercises, {
    nullable: true,
  })
  user: User;
}

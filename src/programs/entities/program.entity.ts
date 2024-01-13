import { MyWorkoutBase } from 'src/common/entities/projectBaseEntity';
import { Exericse } from 'src/exercises/entities/exercises.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Program extends MyWorkoutBase {
  @Column({
    type: 'varchar',
    name: 'program_name',
  })
  name: string;

  @ManyToMany(() => Exericse, { eager: true })
  @JoinTable()
  programExercises: Exericse[];

  @ManyToOne(() => User)
  user: User;
}

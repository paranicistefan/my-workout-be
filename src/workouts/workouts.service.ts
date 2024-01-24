import { Injectable } from '@nestjs/common';
import { Workout } from './entities/workout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { checkResourceExistance } from 'src/common/utils';
import { Repository } from 'typeorm';
import { ProgramsService } from 'src/programs/programs.service';
import {
  IWorkoutExercise,
  IWorkoutScheleton,
} from './interfaces/workout.interfaces';
import { intialSetState } from 'src/sets/interfaces/sets.interfaces';
import { SetsService } from 'src/sets/sets.service';
import { CreateWorkoutDTO } from './dto/create.workout.dto';
import { ExercisesService } from 'src/exercises/exercises.service';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepository: Repository<Workout>,
    private readonly programsService: ProgramsService,
    private readonly setsService: SetsService,
  ) {}

  async getProgramWorkout(programId: string) {
    const selectedProgram = await this.programsService.findOne(programId);
    const latestWorkout = await this.workoutsRepository.findOne({
      where: { program: { id: programId } },
      order: { createdAt: 'DESC' },
    });

    if (latestWorkout) {
      const exercises = latestWorkout.program.programExercises;
      const resExercises: IWorkoutExercise[] = exercises.map(
        ({ name, id }) => ({
          id,
          name,
          sets: latestWorkout.sets
            .filter((set) => set.exercise.id === id)
            .map(({ repetitions, weight: originalWeight }) => ({
              repetitions,
              weight: originalWeight + 2.5,
            })),
        }),
      );

      const workoutScheleton: IWorkoutScheleton = {
        programName: selectedProgram.name,
        exercises: resExercises,
      };
      return workoutScheleton;
    }

    const initialProgramWorkout: IWorkoutScheleton = {
      programName: selectedProgram.name,
      exercises: selectedProgram.programExercises.map(({ name, id }) => ({
        id,
        name,
        sets: [intialSetState],
      })),
    };

    return initialProgramWorkout;
  }

  async createWorkout(
    programId: string,
    workoutScheleton: CreateWorkoutDTO,
    userId: string,
  ) {
    const program = await this.programsService.findOne(programId);
    const user = { id: userId };
    const setsPromise = workoutScheleton.exercises.map((exercise) =>
      exercise.sets.map(
        async (set) =>
          await this.setsService.create({
            ...set,
            exercise: { id: exercise.id },
          }),
      ),
    );
    const sets = await Promise.all(setsPromise.flat());
    return this.workoutsRepository.save({ program, user, sets });
  }

  findAll(id: string, isArchived?: boolean) {
    const user = { id };
    return this.workoutsRepository.find({
      where: { isArchived: !!isArchived, user },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const selectedWorkout = await checkResourceExistance(
      this.workoutsRepository,
      id,
    );

    const exercises = selectedWorkout.program.programExercises;

    console.log(exercises);

    const resExercises: IWorkoutExercise[] = exercises.map(({ name, id }) => ({
      id,
      name,
      sets: selectedWorkout.sets
        .filter((set) => set.exercise.id === id)
        .map(({ repetitions, weight }) => ({
          repetitions,
          weight,
        })),
    }));

    const workoutScheleton: IWorkoutScheleton = {
      programName: selectedWorkout.program.name,
      exercises: resExercises,
    };

    return workoutScheleton;
  }

  async archiveWorkout(id: string) {
    const selectedWorkout = await checkResourceExistance(
      this.workoutsRepository,
      id,
    );

    this.workoutsRepository.save({ ...selectedWorkout, isArchived: true });
  }
}

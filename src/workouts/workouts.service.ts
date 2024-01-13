import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entities/workout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { checkResourceExistance } from 'src/common/utils';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly exercisesRepository: Repository<Workout>,
  ) {}

  create(createWorkoutDto: CreateWorkoutDto) {
    return this.exercisesRepository.save(createWorkoutDto);
  }

  findAll() {
    return this.exercisesRepository.find();
  }

  async findOne(id: string) {
    const selectedExercise = await checkResourceExistance(
      this.exercisesRepository,
      id,
    );
    return selectedExercise;
  }
  async update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    const selectedExercise = await checkResourceExistance(
      this.exercisesRepository,
      id,
    );

    return this.exercisesRepository.save({
      ...selectedExercise,
      ...updateWorkoutDto,
    });
  }

  async remove(id: string) {
    const selectedExercise = await checkResourceExistance(
      this.exercisesRepository,
      id,
    );
    return this.exercisesRepository.remove(selectedExercise);
  }
}

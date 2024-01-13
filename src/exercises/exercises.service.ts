import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkResourceExistance } from 'src/common/utils';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exericse } from './entities/exercises.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exericse)
    private readonly exercisesRepository: Repository<Exericse>,
  ) {}

  create(createExerciseDto: CreateExerciseDto) {
    return this.exercisesRepository.save(createExerciseDto);
  }

  async findAll() {
    const exercises = await this.exercisesRepository.find();
    return exercises;
  }

  async findOne(id: string) {
    const selectedExercise = await checkResourceExistance(
      this.exercisesRepository,
      id,
    );
    return selectedExercise;
  }
  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    const selectedExercise = await checkResourceExistance(
      this.exercisesRepository,
      id,
    );

    return this.exercisesRepository.save({
      ...selectedExercise,
      ...updateExerciseDto,
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

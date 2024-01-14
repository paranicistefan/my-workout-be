import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkResourceExistance } from 'src/common/utils';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exericse } from './entities/exercises.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exericse)
    private readonly exercisesRepository: Repository<Exericse>,
    private readonly userService: UsersService,
  ) {}

  //Create
  createGlobalExercise(createExerciseDto: CreateExerciseDto) {
    return this.exercisesRepository.save(createExerciseDto);
  }

  createUserExercise(createExerciseDto: CreateExerciseDto, id: string) {
    const user = { id };
    return this.exercisesRepository.save({ ...createExerciseDto, user });
  }

  async findPublicExercises() {
    const exercises = await this.exercisesRepository.find({
      where: { user: null },
    });
    return exercises;
  }

  //Reads
  async findUserExercises(userId: string) {
    const user = await this.userService.findOne(userId);
    const userExercises = await this.exercisesRepository.find({
      where: { user },
    });
    return userExercises;
  }

  async findOne(id: string) {
    const selectedExercise = await checkResourceExistance(
      this.exercisesRepository,
      id,
    );
    return selectedExercise;
  }

  //Updates
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

  //Deletes
  async remove(id: string) {
    const selectedExercise = await checkResourceExistance(
      this.exercisesRepository,
      id,
    );
    return this.exercisesRepository.remove(selectedExercise);
  }
}

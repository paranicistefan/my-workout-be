import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkResourceExistance } from 'src/common/utils';
import { IsNull, Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exericse } from './entities/exercises.entity';
import { UsersService } from 'src/users/users.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exericse)
    private readonly exercisesRepository: Repository<Exericse>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  //Create
  createGlobalExercise(createExerciseDto: CreateExerciseDto) {
    return this.exercisesRepository.save(createExerciseDto);
  }

  createUserExercise(createExerciseDto: CreateExerciseDto, id: string) {
    const user = { id };
    return this.exercisesRepository.save({ ...createExerciseDto, user });
  }

  //Reads
  async findPublicExercises() {
    const cachedPublicExercises = (await this.cacheManager.get(
      'publicExercises',
    )) as Exericse[];
    if (cachedPublicExercises) return cachedPublicExercises;
    const exercises = await this.exercisesRepository.find({
      relations: ['user'],
      where: { user: { id: IsNull() } },
    });

    this.cacheManager.set('publicExercises', exercises);
    return exercises;
  }

  async findUserExercises(userId: string) {
    const userExercises = await this.exercisesRepository.find({
      where: { user: { id: userId } },
    });
    return userExercises;
  }

  async findAllUserExercises(userId: string) {
    const cachedExercises = (await this.cacheManager.get(
      'allExercises',
    )) as Exericse[];
    if (cachedExercises) return cachedExercises;
    const userExercises = await this.exercisesRepository.find({
      relations: ['user'],
      where: [{ user: { id: IsNull() } }, { user: { id: userId } }],
      order: { user: { id: 'ASC' } },
    });

    this.cacheManager.set('allExercises', userExercises);
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

import { Injectable } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { Set } from './entities/set.entity';
import { checkResourceExistance } from 'src/common/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(Set)
    private readonly exercisesRepository: Repository<Set>,
  ) {}

  create(createSetDto: CreateSetDto) {
    return this.exercisesRepository.save(createSetDto);
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
  async update(id: string, updateSetDto: UpdateSetDto) {
    const selectedExercise = await checkResourceExistance(
      this.exercisesRepository,
      id,
    );

    return this.exercisesRepository.save({
      ...selectedExercise,
      ...updateSetDto,
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

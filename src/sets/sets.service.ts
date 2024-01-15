import { Injectable } from '@nestjs/common';
import { Set } from './entities/set.entity';
import { checkResourceExistance } from 'src/common/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISetData } from './interfaces/sets.interfaces';

@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(Set)
    private readonly setsRepository: Repository<Set>,
  ) {}

  async create(createSetDto: ISetData) {
    return await this.setsRepository.save(createSetDto);
  }

  findAll() {
    return this.setsRepository.find();
  }

  async findOne(id: string) {
    const selectedExercise = await checkResourceExistance(
      this.setsRepository,
      id,
    );
    return selectedExercise;
  }
  async update(id: string, updateSetDto: ISetData) {
    const selectedExercise = await checkResourceExistance(
      this.setsRepository,
      id,
    );

    return this.setsRepository.save({
      ...selectedExercise,
      ...updateSetDto,
    });
  }

  async remove(id: string) {
    const selectedExercise = await checkResourceExistance(
      this.setsRepository,
      id,
    );
    return this.setsRepository.remove(selectedExercise);
  }
}

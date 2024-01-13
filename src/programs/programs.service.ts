import { Injectable } from '@nestjs/common';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProgramDto } from './dto/create-program.dto';
import { checkResourceExistance } from 'src/common/utils';
import { ExercisesService } from 'src/exercises/exercises.service';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programsRepository: Repository<Program>,
    private readonly exerciseService: ExercisesService,
  ) {}

  //TODO : Add full CRUD functionality
  async create(createProgramDto: CreateProgramDto) {
    console.log(createProgramDto);
    const exercisesToSave = await Promise.all(
      createProgramDto.programExercises.map(async (exerciseId) => {
        const exercise = await this.exerciseService.findOne(exerciseId);
        return exercise;
      }),
    );

    const programToSave = {
      ...createProgramDto,
      programExercises: exercisesToSave,
    };
    return this.programsRepository.save(programToSave);
  }

  async findAll() {
    const programs = await this.programsRepository.find();
    const parsedPrograms = programs.map((program) => {
      const programExercisesNames = program.programExercises
        .map((programExercise) => programExercise.name)
        .join(', ');
      const programsExercisesIDs = program.programExercises.map(
        (programExercise) => programExercise.id,
      );
      return {
        id: program.id,
        name: program.name,
        programExercises:
          programExercisesNames === ''
            ? 'No exercises available'
            : programExercisesNames,
        programsExercisesIDs,
      };
    });
    return parsedPrograms;
  }

  async findOne(id: string) {
    const selectedProgram = await checkResourceExistance(
      this.programsRepository,
      id,
    );
    return selectedProgram;
  }

  async update(id: string, updateProgramDto: CreateProgramDto) {
    const selectedProgram = await checkResourceExistance(
      this.programsRepository,
      id,
    );

    const exercisesToSave = await Promise.all(
      updateProgramDto.programExercises.map(async (exerciseId) => {
        const exercise = await this.exerciseService.findOne(exerciseId);
        return exercise;
      }),
    );
    const programToSave = {
      ...updateProgramDto,
      programExercises: exercisesToSave,
    };

    return this.programsRepository.save({
      ...selectedProgram,
      ...programToSave,
      id,
    });
  }

  async remove(id: string) {
    const selectedProgram = await checkResourceExistance(
      this.programsRepository,
      id,
    );

    return this.programsRepository.remove(selectedProgram);
  }
}

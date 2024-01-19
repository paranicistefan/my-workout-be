import { Injectable } from '@nestjs/common';
import { Program } from './entities/program.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProgramDto } from './dto/create-program.dto';
import { checkResourceExistance, mapToIds } from 'src/common/utils';
import { ExercisesService } from 'src/exercises/exercises.service';
import { UsersService } from 'src/users/users.service';
import { EditExerciseDto } from './dto/edit-exercise.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programsRepository: Repository<Program>,
    private readonly exerciseService: ExercisesService,
    private readonly userService: UsersService,
  ) {}

  //Create
  createGlobalProgram(createProgramDto: CreateProgramDto) {
    const programExercises = mapToIds(createProgramDto.programExercises);
    const program: DeepPartial<Program> = {
      ...createProgramDto,
      programExercises,
    };
    return this.programsRepository.save(program);
  }

  createUserProgram(createProgramDto: CreateProgramDto, id: string) {
    const user = { id };
    const programExercises = mapToIds(createProgramDto.programExercises);
    const program: DeepPartial<Program> = {
      ...createProgramDto,
      user,
      programExercises,
    };
    return this.programsRepository.save(program);
  }

  async addProgramExercise(programId: string, exerciseId: string) {
    const selectedProgram = await checkResourceExistance(
      this.programsRepository,
      programId,
    );
    const selectedExercise = await this.exerciseService.findOne(exerciseId);
    return this.programsRepository.save({
      ...selectedProgram,
      programExercises: [...selectedProgram.programExercises, selectedExercise],
    });
  }

  //Reads
  async findAllUserPrograms(userId: string) {
    const user = await this.userService.findOne(userId);
    const userPrograms = await this.programsRepository.find({
      where: { user: user || null },
    });
    return userPrograms;
  }

  async findPublicPrograms() {
    return await this.programsRepository.find({
      where: { user: null },
    });
  }

  async findPublicMVCPrograms() {
    const programs = await this.programsRepository.find({
      where: { user: null },
    });
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

  //Updates
  async updateProgramExercise(programId: string, exercises: EditExerciseDto) {
    const selectedProgram = await checkResourceExistance(
      this.programsRepository,
      programId,
    );
    const selectedExercise = await this.exerciseService.findOne(
      exercises.newExercise,
    );
    const newProgramExercises = selectedProgram.programExercises.map(
      (exercise) => {
        if (exercise.id !== exercises.oldExercise) return exercise;
        return selectedExercise;
      },
    );
    return this.programsRepository.save({
      ...selectedProgram,
      programExercises: newProgramExercises,
    });
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
  //deleted

  async removeProgramExercise(programId: string, exerciseId: string) {
    const selectedProgram = await checkResourceExistance(
      this.programsRepository,
      programId,
    );
    await this.exerciseService.findOne(exerciseId);

    return this.programsRepository.save({
      ...selectedProgram,
      programExercises: selectedProgram.programExercises.filter(
        (p) => p.id !== exerciseId,
      ),
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

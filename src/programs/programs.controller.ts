import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Redirect,
  Render,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Public } from 'src/users/jwt/auth.public';
import { CreateProgramDto } from './dto/create-program.dto';
import { ProgramsService } from './programs.service';

@Controller('programs')
@ApiBearerAuth()
@ApiTags('Programs')
@ApiBearerAuth()
export class ProgramsController {
  constructor(
    private readonly programsService: ProgramsService,
    private readonly exercisesService: ExercisesService,
  ) {}

  @Get()
  findAll() {
    return this.programsService.findAll();
  }

  @Get('/view')
  @Public()
  @Render('programs')
  async findAllView() {
    const programs = await this.programsService.findAll();
    const exercises = await this.exercisesService.findPublicExercises();
    const hasPrograms = programs.length;
    const hasExercises = exercises.length;
    return { programs, exercises, hasPrograms, hasExercises };
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.programsService.findOne(id);
  // }

  @Post()
  @Public()
  @Redirect('/programs/view')
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Put(':id')
  @Public()
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: CreateProgramDto,
  ) {
    console.log(JSON.stringify(updateProgramDto), 'controller');

    return this.programsService.update(id, updateProgramDto);
  }

  //TODO: An enpoint that returns only the user specific programs, and one that only returns public programs

  //TODO: Implement the deletion of a exercise within a program
  @Delete(':programID/:exerciseId')
  async deleteExericseFromProgram(
    @Param('programId') id: string,
    @Param('exerciseId') exerciseId: string,
  ) {
    console.log(id, exerciseId);
  }
  @Delete(':id')
  @Public()
  async remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}

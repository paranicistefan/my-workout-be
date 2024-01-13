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
    const exercises = await this.exercisesService.findAll();
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

  @Delete(':id')
  @Public()
  async remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}

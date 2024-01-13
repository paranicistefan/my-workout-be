import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/users/jwt/auth.public';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
@ApiBearerAuth()
@ApiTags('Exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    try {
      return this.exercisesService.create(createExerciseDto);
    } catch (error) {
      return error;
    }
  }

  @Post('/view')
  @Public()
  @Redirect('/exercises/view')
  createView(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get('/view')
  @Public()
  @Render('exercises')
  async findAllView() {
    const exercises = await this.exercisesService.findAll();
    const hasExercises = exercises.length;
    return { exercises, hasExercises };
  }

  @Get()
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.exercisesService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    try {
      return this.exercisesService.update(id, updateExerciseDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    try {
      return this.exercisesService.remove(id);
    } catch (error) {
      return error;
    }
  }
}

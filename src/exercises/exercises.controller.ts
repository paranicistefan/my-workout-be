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
import { JWTdata } from 'src/users/jwt/auth.decorator';
import { ITokenPayoload } from 'src/users/interfaces/user.interfaces';

@Controller('exercises')
@ApiTags('Exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}
  @Post()
  @ApiBearerAuth()
  create(
    @Body() createExerciseDto: CreateExerciseDto,
    @JWTdata() tockenData: ITokenPayoload,
  ) {
    try {
      return this.exercisesService.createUserExercise(
        createExerciseDto,
        tockenData.user,
      );
    } catch (error) {
      return error;
    }
  }

  @Get()
  @ApiBearerAuth()
  findAll(@JWTdata() tockenData: ITokenPayoload) {
    try {
      return this.exercisesService.findUserExercises(tockenData.user);
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

  //MVC's

  @Post('/view')
  @Public()
  @Redirect('/exercises/view')
  createView(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.createGlobalExercise(createExerciseDto);
  }

  @Get('/view')
  @Public()
  @Render('exercises')
  async findAllView() {
    const exercises = await this.exercisesService.findPublicExercises();
    console.log(exercises);

    const hasExercises = exercises.length;
    return { exercises, hasExercises };
  }
}

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
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Public } from 'src/users/jwt/auth.public';
import { CreateProgramDto } from './dto/create-program.dto';
import { ProgramsService } from './programs.service';
import { JWTdata } from 'src/users/jwt/auth.decorator';
import { ITokenPayoload } from 'src/users/interfaces/user.interfaces';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { EditExerciseDto } from './dto/edit-exercise.dto';

@Controller('programs')
@ApiTags('Programs')
@UseInterceptors(CacheInterceptor)
export class ProgramsController {
  constructor(
    private readonly programsService: ProgramsService,
    private readonly exercisesService: ExercisesService,
  ) {}

  @Get()
  @ApiBearerAuth()
  findAll(@JWTdata() tokenData: ITokenPayoload) {
    return this.programsService.findAllUserPrograms(tokenData.user);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  create(
    @Body() createProgramDto: CreateProgramDto,
    @JWTdata() jwtData: ITokenPayoload,
  ) {
    try {
      return this.programsService.createUserProgram(
        createProgramDto,
        jwtData.user,
      );
    } catch (error) {
      return error;
    }
  }

  @Post('/programExercises/:programId')
  @ApiBearerAuth()
  async addExerisesToProgram(
    @Param('programId') programId: string,
    @Body() dto: AddExerciseDto,
  ) {
    try {
      return this.programsService.addProgramExercise(
        programId,
        dto.selectedExercise,
      );
    } catch (error) {
      return error;
    }
  }

  @Put('/programExercises/:programId')
  @ApiBearerAuth()
  async editExerisesToProgram(
    @Param('programId') programId: string,
    @Body() dto: EditExerciseDto,
  ) {
    try {
      return this.programsService.updateProgramExercise(programId, dto);
    } catch (error) {
      return error;
    }
  }

  @Delete('/:programId/:exerciseId')
  @ApiBearerAuth()
  async removeExerciseProgram(
    @Param('programId') programId: string,
    @Param('exerciseId') exeriseId: string,
  ) {
    try {
      return this.programsService.removeProgramExercise(programId, exeriseId);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  @Public()
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: CreateProgramDto,
  ) {
    try {
      return this.programsService.update(id, updateProgramDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  @Public()
  async remove(@Param('id') id: string) {
    try {
      return this.programsService.remove(id);
    } catch (error) {
      return error;
    }
  }

  //MVC

  @Get('/view')
  @Public()
  @Render('programs')
  async findAllView() {
    const programs = await this.programsService.findPublicMVCPrograms();
    const exercises = await this.exercisesService.findPublicExercises();
    const hasPrograms = programs.length;
    const hasExercises = exercises.length;
    return { programs, exercises, hasPrograms, hasExercises };
  }

  @Post('/view')
  @Public()
  @Redirect('/programs/view')
  createPublic(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.createGlobalProgram(createProgramDto);
  }
}

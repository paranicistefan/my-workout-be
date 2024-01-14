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
import { JWTdata } from 'src/users/jwt/auth.decorator';
import { ITokenPayoload } from 'src/users/interfaces/user.interfaces';
import { UpdateProgramDto } from './dto/update-program.dto';

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
  findAll(@JWTdata() jwtData: ITokenPayoload) {
    return this.programsService.findUserPrograms(jwtData.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Post()
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

  @Put(':id')
  @Public()
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    try {
      return this.programsService.update(id, updateProgramDto);
    } catch (error) {
      return error;
    }
  }

  // @Delete(':programID/:exerciseId')
  // async deleteExericseFromProgram(
  //   @Param('programId') id: string,
  //   @Param('exerciseId') exerciseId: string,
  // ) {
  //   console.log(id, exerciseId);
  // }

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

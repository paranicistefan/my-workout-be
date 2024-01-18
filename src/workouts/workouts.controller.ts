import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTdata } from 'src/users/jwt/auth.decorator';
import { ITokenPayoload } from 'src/users/interfaces/user.interfaces';
import { CreateWorkoutDTO } from './dto/create.workout.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('workouts')
@ApiBearerAuth()
@ApiTags('Workouts')
@UseInterceptors(CacheInterceptor)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}
  //TODO: Do an endpoint that the last workout with the given program and create a workout scheleton
  @Get(':programId')
  async getWorkoutScheletonAfterProgram(@Param('programId') programId: string) {
    try {
      return this.workoutsService.getProgramWorkout(programId);
    } catch (error) {
      return error;
    }
  }

  @Post(':programId')
  async finishWorkout(
    @Param('programId') programId: string,
    @Body() workoutScheleton: CreateWorkoutDTO,
    @JWTdata() tokenData: ITokenPayoload,
  ) {
    try {
      return this.workoutsService.createWorkout(
        programId,
        workoutScheleton,
        tokenData.user,
      );
    } catch (error) {
      return error;
    }
  }
  // TODO Endpoint for geting the workoputs, with the option to filter by archived on active
  @Get()
  findAll(
    @Query('getArchived') getArchived: boolean,
    @JWTdata() tokenData: ITokenPayoload,
  ) {
    return this.workoutsService.findAll(tokenData.user, getArchived);
  }

  @Get('getWorkout/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.workoutsService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async archiveWorkout(@Param('id') id: string) {
    try {
      return this.workoutsService.archiveWorkout(id);
    } catch (error) {
      return error;
    }
  }
}

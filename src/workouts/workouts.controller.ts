import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IWorkoutScheleton } from './interfaces/workout.interfaces';

@Controller('workouts')
@ApiBearerAuth()
@ApiTags('Workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    try {
      return this.workoutsService.create(createWorkoutDto);
    } catch (error) {
      return error;
    }
  }

  // TODO Endpoint for geting the workoputs, with the option to filter by archived on active
  @Get()
  findAll() {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.workoutsService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  //TODO: Do an endpoint that the last workout with the given program and create a workout scheleton
  @Get(':programId')
  async getWorkoutScheletonAfterProgram(@Param('programId') programId: string) {
    try {
      console.log(programId);
    } catch (error) {
      return error;
    }
  }

  //TODO: Endpoint for finishing the workout
  @Post(':programId')
  async finishWorkout(
    @Param('programId') programId: string,
    @Body() workoutScheleton: IWorkoutScheleton,
  ) {
    try {
      console.log(programId, workoutScheleton);
    } catch (error) {
      return error;
    }
  }

  //TODO: Make an endpoint for archiving a workout
  @Delete(':id')
  async archiveWorkout(@Param('id') id: string) {
    return console.log(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    try {
      return this.workoutsService.update(id, updateWorkoutDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(id);
  }
}

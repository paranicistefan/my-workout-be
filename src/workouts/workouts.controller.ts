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

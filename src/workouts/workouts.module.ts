import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { ProgramsModule } from 'src/programs/programs.module';
import { SetsService } from 'src/sets/sets.service';
import { Set } from 'src/sets/entities/set.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workout, Set]),
    ProgramsModule,
    CacheModule.register(),
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService, SetsService],
})
export class WorkoutsModule {}

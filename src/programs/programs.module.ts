import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { Program } from './entities/program.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Exericse } from 'src/exercises/entities/exercises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program, Exericse])],
  controllers: [ProgramsController],
  providers: [ProgramsService, ExercisesService],
})
export class ProgramsModule {}

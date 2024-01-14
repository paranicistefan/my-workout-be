import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { Program } from './entities/program.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesModule } from 'src/exercises/exercises.module';

@Module({
  imports: [TypeOrmModule.forFeature([Program]), ExercisesModule],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}

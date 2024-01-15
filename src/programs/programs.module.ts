import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { Program } from './entities/program.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Program]), ExercisesModule, UsersModule],
  controllers: [ProgramsController],
  providers: [ProgramsService],
  exports: [ProgramsService],
})
export class ProgramsModule {}

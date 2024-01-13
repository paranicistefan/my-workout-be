import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exericse } from './entities/exercises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exericse])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}

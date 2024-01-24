import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateWorkoutDTO {
  @ApiProperty()
  exercises: ExercisesDTO[];
}

export class ExercisesDTO {
  @ApiProperty()
  @IsUUID()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  sets: SetsDTO[];
}

export class SetsDTO {
  @ApiProperty()
  repetitions: number;
  @ApiProperty()
  weight: number;
}

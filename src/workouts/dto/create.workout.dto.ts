import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutDTO {
  @ApiProperty()
  exercises: ExercisesDTO[];
}

export class ExercisesDTO {
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

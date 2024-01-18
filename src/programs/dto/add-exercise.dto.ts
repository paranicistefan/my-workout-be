import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AddExerciseDto {
  @ApiProperty()
  @IsUUID()
  selectedExercise: string;
}

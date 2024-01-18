import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class EditExerciseDto {
  @ApiProperty()
  @IsUUID()
  oldExercise: string;
  @ApiProperty()
  @IsUUID()
  newExercise: string;
}

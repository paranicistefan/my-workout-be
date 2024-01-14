import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

//TODO: Implement add exercise to program fucntionality
export class AddExerciseDto {
  @ApiProperty()
  @IsUUID()
  exerciseId: string;
}

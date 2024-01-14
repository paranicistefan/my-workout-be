import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  targetedGroupe: string;
}

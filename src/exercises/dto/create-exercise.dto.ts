import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  targetedGroupe: string;
}

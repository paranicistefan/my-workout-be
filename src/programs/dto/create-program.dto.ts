import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';

export class CreateProgramDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsArray()
  @IsUUID(4, { each: true })
  programExercises: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class SignUpDto extends LoginDto {
  @ApiProperty()
  name: string;
}

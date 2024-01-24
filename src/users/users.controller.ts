import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sing-up.dto';
import { Public } from './jwt/auth.public';

@Controller('user')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //TODO : Add full CRUD functionality
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   try {
  //     return this.userService.findOne(id);
  //   } catch (error) {
  //     return error;
  //   }
  // }

  @Post('/login')
  @Public()
  login(@Body() loginDto: LoginDto) {
    try {
      return this.userService.login(loginDto);
    } catch (error) {
      return error;
    }
  }

  @Post('/signup')
  @Public()
  singUp(@Body() signUp: SignUpDto) {
    try {
      return this.userService.singUP(signUp);
    } catch (error) {
      return error;
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}

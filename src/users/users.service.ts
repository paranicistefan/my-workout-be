import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sing-up.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //TODO : Add full CRUD functionality
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new NotFoundException(
        'The user with the provided id was not found',
      );
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user)
      throw new NotFoundException(
        'The user with the provided email was not found',
      );
    return user;
  }

  async login(signInDto: LoginDto) {
    const { password: encryptedPassword, ...currentUser } =
      await this.findOneByEmail(signInDto.email);
    const passMatches = await compare(signInDto.password, encryptedPassword);
    if (!passMatches) {
      throw new ForbiddenException('Wrong email or password');
    }
    const jwtPayload = {
      email: currentUser.email,
      user: currentUser.id,
    };
    return {
      access_token: this.jwtService.sign(jwtPayload),
      ...currentUser,
    };
  }

  async singUP(singUpDto: SignUpDto) {
    const user = await this.usersRepository.findOne({
      where: { email: singUpDto.email },
    });
    if (user) {
      throw new BadRequestException(
        'This email already has an account assigned to it',
      );
    }

    const hashedPassword = await hash(singUpDto.password, 10);
    return this.usersRepository.save({
      ...singUpDto,
      password: hashedPassword,
    });
  }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

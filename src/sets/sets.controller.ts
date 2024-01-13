import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('sets')
@ApiBearerAuth()
@ApiTags('Sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  create(@Body() createSetDto: CreateSetDto) {
    try {
      return this.setsService.create(createSetDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    return this.setsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.setsService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetDto: UpdateSetDto) {
    try {
      return this.setsService.update(id, updateSetDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.setsService.remove(id);
    } catch (error) {
      return error;
    }
  }
}

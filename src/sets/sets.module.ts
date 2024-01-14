import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Set } from './entities/set.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Set])],
  providers: [SetsService],
})
export class SetsModule {}

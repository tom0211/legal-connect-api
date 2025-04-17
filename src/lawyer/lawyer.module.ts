import { Module } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { LawyerController } from './lawyer.controller';
import { Lawyer } from './model/lawyer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Lawyer])],
  providers: [LawyerService],
  controllers: [LawyerController],
})
export class LawyerModule {}

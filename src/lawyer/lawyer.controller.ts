import { Body, Controller, Get, Post } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { Lawyer } from './model/lawyer.entity';

@Controller('lawyer')
export class LawyerController {
  constructor(private readonly lawyerService: LawyerService) {}

  @Get()
  getAll(): Promise<Lawyer[]> {
    return this.lawyerService.findAll();
  }

  @Post()
  create(@Body() lawyerData: Partial<Lawyer>) {
    return this.lawyerService.create(lawyerData);
  }
}

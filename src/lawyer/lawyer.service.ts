import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lawyer } from './model/lawyer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LawyerService {
  constructor(
    @InjectRepository(Lawyer)
    private lawyerRepository: Repository<Lawyer>,
  ) {}

  findAll(): Promise<Lawyer[]> {
    return this.lawyerRepository.find();
  }

  create(lawyerData: Partial<Lawyer>) {
    const lawyer = this.lawyerRepository.create(lawyerData);
    return this.lawyerRepository.save(lawyer);
  }
}

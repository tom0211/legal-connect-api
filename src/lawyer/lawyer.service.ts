import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lawyer } from './dto/lawyer.entity';
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

  async create(dto: Partial<Lawyer>) {
    // as email is the unique constraint
    const existing = await this.lawyerRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }
    const lawyer = this.lawyerRepository.create(dto);
    return this.lawyerRepository.save(lawyer);
  }
}

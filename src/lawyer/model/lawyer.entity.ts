import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lawyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  specialization: string;

  @Column()
  city: string;
}

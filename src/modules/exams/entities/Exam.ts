import Laboratory from '@modules/laboratories/entities/Laboratory';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('exams')
class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: 'analise clinica' | 'imagem';

  @Column({ default: false })
  status: boolean;

  @ManyToMany(() => Laboratory, laboratory => laboratory.exams)
  laboratories: Laboratory[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Exam;

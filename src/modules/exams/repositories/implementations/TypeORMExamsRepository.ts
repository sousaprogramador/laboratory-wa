import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import Pagination from '@modules/pagination';
import { Repository, getRepository } from 'typeorm';
import Exam from '../../entities/Exam';
import ICreateExamDTO from '../../dtos/ICreateExamDTO';
import IFindAllByStatusAndType from '../../dtos/IFindAllByStatusAndTypeDTO';
import IExamsRepository from '../IExamsRepository';

class TypeORMExamsRepository implements IExamsRepository {
  private ormRepository: Repository<Exam>;

  constructor() {
    this.ormRepository = getRepository(Exam);
  }

  public async create(data: ICreateExamDTO): Promise<Exam> {
    const exam = this.ormRepository.create({
      ...data,
      laboratories: [],
    });

    await this.ormRepository.save(exam);

    return exam;
  }

  public async save(exam: Exam): Promise<Exam> {
    return this.ormRepository.save(exam);
  }

  public async remove(exam: Exam): Promise<Exam> {
    return this.ormRepository.remove(exam);
  }

  public async findById(examId: string): Promise<Exam | undefined> {
    const exam = this.ormRepository.findOne({ where: { id: examId } });
    return exam;
  }

  public async findByName(name: string): Promise<Exam | undefined> {
    const exam = await this.ormRepository
      .createQueryBuilder('exams')
      .where('exams.name = :name', { name })
      .leftJoinAndSelect('exams.laboratories', 'laboratories')
      .getOne();

    return exam;
  }

  public async findAllByStatusAndType(
    { status, type }: IFindAllByStatusAndType,
    { limit, page }: IPaginationOptions,
  ): Promise<Pagination<Exam>> {
    let query = this.ormRepository
      .createQueryBuilder('exams')
      .where('exams.status = :status', { status });

    if (type) query = query.andWhere('exams.type = :type', { type });

    const values = await query
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    const total = await query.getCount();

    return {
      values,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export default TypeORMExamsRepository;

import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import Pagination from '@modules/pagination';
import { Repository, getRepository } from 'typeorm';
import Laboratory from '../../entities/Laboratory';
import ILaboratoriesRepository from '../ILaboratoriesRepository';
import ICreateLaboratoryDTO from '../../dtos/ICreateLaboratoryDTO';
import IFindByIdAndExamDTO from '../../dtos/IFindByIdAndExamDTO';
import IRemoveExamDTO from '../../dtos/IRemoveExamDTO';

class TypeORMLaboratoriesRepository implements ILaboratoriesRepository {
  private ormRepository: Repository<Laboratory>;

  constructor() {
    this.ormRepository = getRepository(Laboratory);
  }

  public async create(data: ICreateLaboratoryDTO): Promise<Laboratory> {
    const laboratory = this.ormRepository.create({
      ...data,
      exams: [],
    });

    await this.ormRepository.save(laboratory);

    return laboratory;
  }

  public async save(laboratory: Laboratory): Promise<Laboratory> {
    return this.ormRepository.save(laboratory);
  }

  public async remove(laboratory: Laboratory): Promise<Laboratory> {
    return this.ormRepository.remove(laboratory);
  }

  public async removeExam({
    laboratoryId,
    examId,
  }: IRemoveExamDTO): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .relation(Laboratory, 'exams')
      .of({ id: laboratoryId })
      .remove({ id: examId });
  }

  public async findById(laboratoryId: string): Promise<Laboratory | undefined> {
    const laboratory = this.ormRepository.findOne({
      where: { id: laboratoryId },
    });

    return laboratory;
  }

  public async findByName(name: string): Promise<Laboratory | undefined> {
    const laboratory = this.ormRepository.findOne({
      where: { name },
    });

    return laboratory;
  }

  public async findAllByStatus(
    status: boolean,
    { limit, page }: IPaginationOptions,
  ): Promise<Pagination<Laboratory>> {
    const [laboratories, total] = await this.ormRepository.findAndCount({
      where: {
        status,
      },
      take: limit,
      skip: (page - 1) * limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      values: laboratories,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async findByIdAndExam({
    laboratoryId,
    examId,
  }: IFindByIdAndExamDTO): Promise<Laboratory | undefined> {
    const laboratory = await this.ormRepository
      .createQueryBuilder('laboratories')
      .where('laboratories.id = :laboratoryId', { laboratoryId })
      .innerJoinAndSelect('laboratories.exams', 'exams')
      .andWhere('exams.id = :examId', { examId })
      .getOne();

    return laboratory;
  }
}

export default TypeORMLaboratoriesRepository;

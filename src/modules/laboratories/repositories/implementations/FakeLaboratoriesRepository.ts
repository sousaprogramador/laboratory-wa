import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import Pagination from '@modules/pagination';
import { v4 as uuidv4 } from 'uuid';
import Laboratory from '../../entities/Laboratory';
import ILaboratoriesRepository from '../ILaboratoriesRepository';
import ICreateLaboratoryDTO from '../../dtos/ICreateLaboratoryDTO';
import IFindByIdAndExamDTO from '../../dtos/IFindByIdAndExamDTO';
import IRemoveExamDTO from '../../dtos/IRemoveExamDTO';

class FakeLaboratoriesRepository implements ILaboratoriesRepository {
  private laboratories: Laboratory[] = [];

  public async create(data: ICreateLaboratoryDTO): Promise<Laboratory> {
    const laboratory = new Laboratory();

    Object.assign(laboratory, {
      ...data,
      id: uuidv4(),
      status: false,
      exams: [],
    });

    this.laboratories.push(laboratory);

    return laboratory;
  }

  public async save(laboratory: Laboratory): Promise<Laboratory> {
    const index = this.laboratories.findIndex(
      findLaboratory => findLaboratory.id === laboratory.id,
    );

    this.laboratories[index] = laboratory;

    return laboratory;
  }

  public async remove(laboratory: Laboratory): Promise<Laboratory> {
    const index = this.laboratories.findIndex(
      findLaboratory => findLaboratory.id === laboratory.id,
    );

    this.laboratories.splice(index, 1);

    return laboratory;
  }

  public async removeExam({
    laboratoryId,
    examId,
  }: IRemoveExamDTO): Promise<void> {
    this.laboratories = this.laboratories.map(foundLaboratory => {
      if (foundLaboratory.id !== laboratoryId) return foundLaboratory;

      const index = foundLaboratory.exams.findIndex(
        findExam => findExam.id === examId,
      );

      foundLaboratory.exams.splice(index, 1);

      return foundLaboratory;
    });
  }

  public async findById(laboratoryId: string): Promise<Laboratory | undefined> {
    return this.laboratories.find(laboratory => laboratory.id === laboratoryId);
  }

  public async findByName(name: string): Promise<Laboratory | undefined> {
    return this.laboratories.find(laboratory => laboratory.name === name);
  }

  public async findAllByStatus(
    status: boolean,
    { limit, page }: IPaginationOptions,
  ): Promise<Pagination<Laboratory>> {
    const foundLaboratories = this.laboratories.filter(
      findWithdraw => findWithdraw.status === status,
    );

    const total = foundLaboratories.length;

    return {
      values: foundLaboratories.slice((page - 1) * limit, page * limit),
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async findByIdAndExam({
    laboratoryId,
    examId,
  }: IFindByIdAndExamDTO): Promise<Laboratory | undefined> {
    const laboratory = await this.laboratories.find(
      foundLaboratory => foundLaboratory.id === laboratoryId,
    );

    if (!laboratory) return undefined;

    return laboratory.exams.find(foundExam => foundExam.id === examId)
      ? laboratory
      : undefined;
  }
}

export default FakeLaboratoriesRepository;

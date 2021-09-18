import Pagination from '@modules/pagination';
import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import { v4 as uuidv4 } from 'uuid';
import Exam from '../../entities/Exam';
import IExamsRepository from '../IExamsRepository';
import ICreateExamDTO from '../../dtos/ICreateExamDTO';
import IFindAllByStatusAndType from '../../dtos/IFindAllByStatusAndTypeDTO';

class FakeExamsRepository implements IExamsRepository {
  private exams: Exam[] = [];

  public async create(data: ICreateExamDTO): Promise<Exam> {
    const exam = new Exam();

    Object.assign(exam, {
      ...data,
      id: uuidv4(),
      status: false,
      laboratories: [],
    });

    this.exams.push(exam);

    return exam;
  }

  public async save(exam: Exam): Promise<Exam> {
    const index = this.exams.findIndex(findExam => findExam.id === exam.id);

    this.exams[index] = exam;

    return exam;
  }

  public async remove(exam: Exam): Promise<Exam> {
    const index = this.exams.findIndex(findExam => findExam.id === exam.id);

    this.exams.splice(index, 1);

    return exam;
  }

  public async findById(examId: string): Promise<Exam | undefined> {
    return this.exams.find(exam => exam.id === examId);
  }

  public async findByName(name: string): Promise<Exam | undefined> {
    return this.exams.find(exam => exam.name === name);
  }

  public async findAllByStatusAndType(
    { status, type }: IFindAllByStatusAndType,
    { limit, page }: IPaginationOptions,
  ): Promise<Pagination<Exam>> {
    const foundExams = this.exams.filter(
      findWithdraw =>
        findWithdraw.status === status && findWithdraw.type === type,
    );

    const total = foundExams.length;

    return {
      values: foundExams.slice((page - 1) * limit, page * limit),
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export default FakeExamsRepository;

import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import Pagination from '@modules/pagination';
import Exam from '../entities/Exam';
import ICreateExamDTO from '../dtos/ICreateExamDTO';
import IFindAllByStatusAndType from '../dtos/IFindAllByStatusAndTypeDTO';

export default interface IExamsRepository {
  create(data: ICreateExamDTO): Promise<Exam>;
  save(exam: Exam): Promise<Exam>;
  remove(exam: Exam): Promise<Exam>;
  findById(examId: string): Promise<Exam | undefined>;
  findByName(name: string): Promise<Exam | undefined>;
  findAllByStatusAndType(
    data: IFindAllByStatusAndType,
    paginationOptions: IPaginationOptions,
  ): Promise<Pagination<Exam>>;
}

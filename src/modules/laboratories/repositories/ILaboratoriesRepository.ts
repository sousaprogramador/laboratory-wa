import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import Pagination from '@modules/pagination';
import Laboratory from '../entities/Laboratory';
import ICreateLaboratoryDTO from '../dtos/ICreateLaboratoryDTO';
import IFindByIdAndExamDTO from '../dtos/IFindByIdAndExamDTO';
import IRemoveExamDTO from '../dtos/IRemoveExamDTO';

export default interface ILaboratoriesRepository {
  create(data: ICreateLaboratoryDTO): Promise<Laboratory>;
  save(laboratory: Laboratory): Promise<Laboratory>;
  remove(laboratory: Laboratory): Promise<Laboratory>;
  removeExam(data: IRemoveExamDTO): Promise<void>;
  findById(laboratoryId: string): Promise<Laboratory | undefined>;
  findByName(name: string): Promise<Laboratory | undefined>;
  findAllByStatus(
    status: boolean,
    paginationOptions: IPaginationOptions,
  ): Promise<Pagination<Laboratory>>;
  findByIdAndExam(data: IFindByIdAndExamDTO): Promise<Laboratory | undefined>;
}

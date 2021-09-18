import Pagination from '@modules/pagination';
import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import { inject, injectable } from 'tsyringe';
import Exam from '../entities/Exam';
import IExamsRepository from '../repositories/IExamsRepository';

interface IRequest {
  status: boolean;
  type?: 'analise clinica' | 'imagem';
  paginationOptions: IPaginationOptions;
}

@injectable()
export default class ListExamsService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}

  public async execute({
    status,
    type,
    paginationOptions,
  }: IRequest): Promise<Pagination<Exam>> {
    const data = await this.examsRepository.findAllByStatusAndType(
      { status, type },
      paginationOptions,
    );

    return data;
  }
}

import Pagination from '@modules/pagination';
import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import { inject, injectable } from 'tsyringe';
import Laboratory from '../entities/Laboratory';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

interface IRequest {
  status: boolean;
  paginationOptions: IPaginationOptions;
}

@injectable()
export default class ListLaboratoriesServices {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesService: ILaboratoriesRepository,
  ) {}

  public async execute({
    status,
    paginationOptions,
  }: IRequest): Promise<Pagination<Laboratory>> {
    const data = await this.laboratoriesService.findAllByStatus(
      status,
      paginationOptions,
    );

    return data;
  }
}

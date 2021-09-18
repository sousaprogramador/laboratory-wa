import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Laboratory from '../entities/Laboratory';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

interface IRequest {
  laboratoryId: string;
}

@injectable()
export default class ShowLaboratoryService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute({ laboratoryId }: IRequest): Promise<Laboratory> {
    const laboratory = await this.laboratoriesRepository.findById(laboratoryId);

    if (!laboratory) throw new AppError("Laboratory doesn't exist", 404);

    return laboratory;
  }
}

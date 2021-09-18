/* eslint-disable camelcase */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Laboratory from '../entities/Laboratory';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

interface IRequest {
  laboratory_id: string;
  name: string;
  address: string;
  status: boolean;
}

@injectable()
export default class UpdateBatchLaboratoriesService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute(requests: IRequest[]): Promise<Laboratory[]> {
    const laboratories = await Promise.all(
      requests.map(async request => {
        const laboratory = await this.laboratoriesRepository.findById(
          request.laboratory_id,
        );

        if (!laboratory) throw new AppError("Laboratory doesn't exist", 404);

        const sameNameLaboratory = await this.laboratoriesRepository.findByName(
          request.name,
        );

        if (sameNameLaboratory && sameNameLaboratory.id !== laboratory.id)
          throw new AppError(
            `Laboratory with name ${request.name} already in use`,
          );

        laboratory.name = request.name;
        laboratory.address = request.address;
        laboratory.status = request.status;
        await this.laboratoriesRepository.save(laboratory);

        return laboratory;
      }),
    );

    return laboratories;
  }
}

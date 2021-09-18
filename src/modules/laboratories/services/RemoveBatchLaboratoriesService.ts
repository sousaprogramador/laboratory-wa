/* eslint-disable camelcase */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

interface IRequest {
  laboratory_id: string;
}

@injectable()
export default class RemoveBatchLaboratoriesService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute(requests: IRequest[]): Promise<void> {
    await Promise.all(
      requests.map(async request => {
        const laboratory = await this.laboratoriesRepository.findById(
          request.laboratory_id,
        );

        if (!laboratory)
          throw new AppError(
            `Laboratory with id ${request.laboratory_id} doesn't exist`,
            404,
          );

        await this.laboratoriesRepository.remove(laboratory);
      }),
    );
  }
}

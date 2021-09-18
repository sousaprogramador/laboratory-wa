import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Laboratory from '../entities/Laboratory';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

interface IRequest {
  name: string;
  address: string;
}

@injectable()
export default class CreateLaboratoryService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute(
    requests: IRequest[],
  ): Promise<Laboratory[] | Laboratory> {
    const laboratories = await Promise.all(
      requests.map(async request => {
        if (await this.laboratoriesRepository.findByName(request.name))
          throw new AppError(
            `Laboratory with the name ${request.name} is already in use`,
          );

        return this.laboratoriesRepository.create({
          name: request.name,
          address: request.address,
        });
      }),
    );

    if (laboratories.length === 1) return laboratories[0];

    return laboratories;
  }
}

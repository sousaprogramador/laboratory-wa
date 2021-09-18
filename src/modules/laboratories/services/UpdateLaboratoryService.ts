import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Laboratory from '../entities/Laboratory';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

interface IRequest {
  laboratoryId: string;
  name: string;
  address: string;
  status: boolean;
}

@injectable()
export default class UpdateLaboratoryService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute({
    laboratoryId,
    name,
    address,
    status,
  }: IRequest): Promise<Laboratory> {
    const laboratory = await this.laboratoriesRepository.findById(laboratoryId);

    if (!laboratory) throw new AppError("Laboratory doesn't exist", 404);

    const sameNameLaboratory = await this.laboratoriesRepository.findByName(
      name,
    );

    if (sameNameLaboratory && sameNameLaboratory.id !== laboratory.id)
      throw new AppError(`Laboratory with name ${name} already in use`);

    laboratory.name = name;
    laboratory.address = address;
    laboratory.status = status;
    await this.laboratoriesRepository.save(laboratory);

    return laboratory;
  }
}

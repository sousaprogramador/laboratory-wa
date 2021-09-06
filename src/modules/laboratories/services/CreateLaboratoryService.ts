import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Laboratory from '../infra/typeorm/entities/Laboratory';

interface Request {
    name: string;
    address: string;
}[]

class CreateLaboratoryService {
    public async execute(laboratoryData: Request): Promise<Laboratory> {
        try {
            const laboratoryRepository = getRepository(Laboratory);

            const laboratory = laboratoryRepository.create(laboratoryData);

            await laboratoryRepository.save(laboratory);

            return laboratory;
        } catch (error) {
            throw new AppError("Erro ao cadastrar Laboratório(s)");
        }
    }
}

export default CreateLaboratoryService;
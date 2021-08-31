import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Laboratory from '../models/Laboratory';

interface Request {
    name: string;
    address: string;
}

class CreateLaboratoryService {
    public async execute({name, address}: Request): Promise<Laboratory> {
        try {
            const laboratoryRepository = getRepository(Laboratory);

            const laboratory = laboratoryRepository.create({
                name,
                address,
            });

            await laboratoryRepository.save(laboratory);

            return laboratory;
        } catch (error) {
            throw new AppError("Erro ao cadastrar Laboratório");
        }
    }
}

export default CreateLaboratoryService;
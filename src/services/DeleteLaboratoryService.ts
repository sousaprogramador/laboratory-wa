import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Laboratory, {StatusTypes} from '../models/Laboratory';

interface Request {
    id: number;
}

class DeleteLaboratoryService {
    public async execute({id}: Request): Promise<void> {
        try {
            const laboratoryRepository = getRepository(Laboratory);

            await laboratoryRepository.delete({id: id, status: StatusTypes.ATIVO});

        } catch (error) {
            throw new AppError("Erro ao deletar Laboratório");
        }
    }
}

export default DeleteLaboratoryService;
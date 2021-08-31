import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Laboratory, { StatusTypes } from '../models/Laboratory';

interface Request {
    id: string;
    name: string;
    address: string;
    status?: StatusTypes;
}

class UpdateLaboratoryService {
    public async execute({id, name, address, status}: Request): Promise<void> {
        try {
            const laboratoryRepository = getRepository(Laboratory);

            await laboratoryRepository.update(id, {name, address, status});

            // const task = await taskRepository.findOne(id);

            // return task;

        } catch (error) {
            throw new AppError("Erro ao atualizar Laboratório");
        }
    }
}

export default UpdateLaboratoryService;
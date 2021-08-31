import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Exam, { ExamTypes, StatusTypes } from '../models/Exam';

interface Request {
    id: string;
    name: string;
    type: ExamTypes;
    status?: StatusTypes;
}

class UpdateExamService {
    public async execute({id, name, type, status}: Request): Promise<void> {
        try {
            const examRepository = getRepository(Exam);

            await examRepository.update(id, {name, type, status});

            // const task = await taskRepository.findOne(id);

            // return task;

        } catch (error) {
            throw new AppError("Erro ao atualizar Exame");
        }
    }
}

export default UpdateExamService;
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Exam, { ExamTypes } from '../models/Exam';
import Laboratory from '../models/Laboratory';

interface Request {
    name: string;
    type: ExamTypes;
    laboratory_id: number;
}

interface Response {
    status: number;
    message: string;
}

class CreateExamService {
    public async execute({name, type, laboratory_id}: Request): Promise<Exam | Response> {
        
            const examRepository = getRepository(Exam);

            const exam = examRepository.create({
                name,
                type,
                laboratory_id
            });

        try {
            await examRepository.save(exam);

            return exam;
        } catch (error) {
            throw new AppError("Erro ao cadastrar Exame");
        }
    }
}

export default CreateExamService;
import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Exam, { ExamTypes } from '@modules/exams/infra/typeorm/entities/Exam';
import Laboratory from '@modules/laboratories/infra/typeorm/entities/Laboratory';

interface Request {
    name: string;
    type: ExamTypes;
    laboratory_id: number;
}[];

class CreateExamService {
    public async execute(examData: Request): Promise<Exam> {
        
            const examRepository = getRepository(Exam);

            const exam = examRepository.create(examData);

        try {
            await examRepository.save(exam);

            return exam;
        } catch (error) {
            throw new AppError("Erro ao cadastrar Exame");
        }
    }
}

export default CreateExamService;
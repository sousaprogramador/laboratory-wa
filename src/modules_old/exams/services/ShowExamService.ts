import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Exam from '../infra/typeorm/entities/Exam';

class ShowExamService {
    public async execute(): Promise<Exam[]> {
        try {
            const examRepository = getRepository(Exam);

            const exam = await examRepository.find({
                relations: ["laboratory"],
                where: {status: "ativo"},
                order: {
                    created_at: "DESC",
                    id: "DESC"
                }
            });

            return exam;
        } catch (error) {
            throw new AppError("Erro ao exibir Exame");
        }
    }
}

export default ShowExamService;
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Exam, {StatusTypes} from '../models/Exam';

interface Request {
    id: number;
}

class DeleteExamService {
    public async execute({id}: Request): Promise<void> {
        try {
            const examRepository = getRepository(Exam);

            await examRepository.delete({id: id, status: StatusTypes.ATIVO});

        } catch (error) {
            throw new AppError("Erro ao deletar Exame");
        }
    }
}

export default DeleteExamService;
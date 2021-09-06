import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Laboratory from '../infra/typeorm/entities/Laboratory';

class ShowLaboratoryService {
    public async execute(): Promise<Laboratory[]> {
        try {
            const laboratoryRepository = getRepository(Laboratory);

            const laboratory = await laboratoryRepository.find({
                where: {status: "ativo"},
                order: {
                    created_at: "DESC",
                    id: "DESC"
                }
            });

            return laboratory;
        } catch (error) {
            throw new AppError("Erro ao cadastrar Laboratório(s)");
        }
    }
}

export default ShowLaboratoryService;
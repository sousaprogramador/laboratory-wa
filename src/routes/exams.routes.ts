import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateExamService from '../services/CreateExamService';
import DeleteExamService from '../services/DeleteExamService';
import UpdateExamService from '../services/UpdateExamService';

import Exam from '../models/Exam';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const examRouter = Router();

examRouter.use(ensureAuthenticated);

examRouter.get('/', async (request, response) => {
    const examRepository = getRepository(Exam);

    const exam = await examRepository.find({where: {status: "ativo"}});

    return response.json(exam);
});

examRouter.post('/', async (request, response) => {
    const {
        name,
        type,
        laboratory_id
    } = request.body;

    const createExam = new CreateExamService();

    const newExam = await createExam.execute({
        name,
        type,
        laboratory_id
    });

    return response.json(newExam);
});

examRouter.patch('/:id', async (request, response) => {
    const {id} = request.params;
    const {name, type, status} = request.body;

    const updateExam = new UpdateExamService();

    const exam = await updateExam.execute({
        id,
        name,
        type,
        status
    });

    return response.status(200).json(exam);

});

examRouter.delete('/:id', async (request, response) => {
    const {id} = request.params;

    const deleteExam = new DeleteExamService();

    const exam = await deleteExam.execute({id: Number(id)});

    return response.status(204).json(exam);

});

export default examRouter;
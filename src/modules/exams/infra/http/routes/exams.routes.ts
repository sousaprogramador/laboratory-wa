import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateExamService from '@modules/exams/services/CreateExamService';
import DeleteExamService from '@modules/exams/services/DeleteExamService';
import UpdateExamService from '@modules/exams/services/UpdateExamService';

import Exam from '../../typeorm/entities/Exam';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ShowExamService from '@modules/exams/services/ShowExamService';

const examRouter = Router();

examRouter.use(ensureAuthenticated);

examRouter.get('/', async (request, response) => {
    const examService = new ShowExamService();

    const exam = await examService.execute();

    return response.json(exam);
});

examRouter.post('/', async (request, response) => {
    const examData = request.body;

    const createExam = new CreateExamService();

    const newExam = await createExam.execute(examData);

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
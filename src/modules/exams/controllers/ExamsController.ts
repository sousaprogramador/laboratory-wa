import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateExamsService from '../services/CreateExamsService';
import ListExamsService from '../services/ListExamsService';
import RemoveBatchExamsService from '../services/RemoveBatchExamsService';
import RemoveExamService from '../services/RemoveExamService';
import ShowExamService from '../services/ShowExamService';
import UpdateBatchExamsService from '../services/UpdateBatchExamsService';
import UpdateExamService from '../services/UpdateExamService';

export default class ExamsController {
  async create(req: Request, res: Response): Promise<Response> {
    if (!Array.isArray(req.body)) req.body = [req.body];

    const createExams = container.resolve(CreateExamsService);

    const laboratories = await createExams.execute(req.body);

    return res.status(201).json(classToClass(laboratories));
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { status, type } = req.query;
    const { paginationOptions } = req;

    const filteredStatus = status !== undefined ? status === 'true' : true;
    const filteredType = type
      ? (type as 'analise clinica' | 'imagem')
      : undefined;

    const listExams = container.resolve(ListExamsService);
    const data = await listExams.execute({
      status: filteredStatus,
      type: filteredType,
      paginationOptions,
    });

    return res.json(classToClass(data));
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { exam_id: examId } = req.params;

    const removeExam = container.resolve(RemoveExamService);
    await removeExam.execute({
      examId,
    });

    return res.status(204).send();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { exam_id: examId } = req.params;
    const { name, status, type } = req.body;

    const updateExam = container.resolve(UpdateExamService);
    const exam = await updateExam.execute({
      examId,
      name,
      type,
      status,
    });

    return res.json(classToClass(exam));
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;

    const showExam = container.resolve(ShowExamService);
    const exam = await showExam.execute({
      name,
    });

    return res.json(classToClass(exam));
  }

  async batchRemove(req: Request, res: Response): Promise<Response> {
    const removeBatchExams = container.resolve(RemoveBatchExamsService);
    await removeBatchExams.execute(req.body);

    return res.status(204).send();
  }

  async batchUpdate(req: Request, res: Response): Promise<Response> {
    const updateBatchExams = container.resolve(UpdateBatchExamsService);

    const laboratories = await updateBatchExams.execute(req.body);

    return res.json(classToClass(laboratories));
  }
}

import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AssociateExamToLaboratoryService from '../services/AssociateExamToLaboratoryService';
import CreateLaboratoryService from '../services/CreateLaboratoryService';
import DisassociateExamToLaboratoryService from '../services/DisassociateExamToLaboratoryService';
import ListLaboratoriesServices from '../services/ListLaboratoriesServices';
import RemoveBatchLaboratoriesService from '../services/RemoveBatchLaboratoriesService';
import RemoveLaboratoryService from '../services/RemoveLaboratoryService';
import ShowLaboratoryService from '../services/ShowLaboratoryService';
import UpdateBatchLaboratoriesService from '../services/UpdateBatchLaboratoriesService';
import UpdateLaboratoryService from '../services/UpdateLaboratoryService';

export default class LaboratoriesController {
  async create(req: Request, res: Response): Promise<Response> {
    if (!Array.isArray(req.body)) req.body = [req.body];

    const createLaboratory = container.resolve(CreateLaboratoryService);

    const laboratories = await createLaboratory.execute(req.body);

    return res.status(201).json(classToClass(laboratories));
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { paginationOptions } = req;
    const { status } = req.query;

    const filteredStatus = status !== undefined ? status === 'true' : true;

    const listLaboratories = container.resolve(ListLaboratoriesServices);
    const data = await listLaboratories.execute({
      status: filteredStatus,
      paginationOptions,
    });

    return res.json(classToClass(data));
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { laboratory_id: laboratoryId } = req.params;

    const showLaboratory = container.resolve(ShowLaboratoryService);
    const laboratory = await showLaboratory.execute({
      laboratoryId,
    });

    return res.json(classToClass(laboratory));
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { laboratory_id: laboratoryId } = req.params;

    const removeLaboratory = container.resolve(RemoveLaboratoryService);
    await removeLaboratory.execute({
      laboratoryId,
    });

    return res.status(204).send();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { laboratory_id: laboratoryId } = req.params;

    const updateLaboratory = container.resolve(UpdateLaboratoryService);
    const laboratory = await updateLaboratory.execute({
      laboratoryId,
      ...req.body,
    });

    return res.json(classToClass(laboratory));
  }

  async batchRemove(req: Request, res: Response): Promise<Response> {
    const removeBatchLaboratories = container.resolve(
      RemoveBatchLaboratoriesService,
    );
    await removeBatchLaboratories.execute(req.body);

    return res.status(204).send();
  }

  async batchUpdate(req: Request, res: Response): Promise<Response> {
    const updateBatchLaboratories = container.resolve(
      UpdateBatchLaboratoriesService,
    );

    const laboratories = await updateBatchLaboratories.execute(req.body);

    return res.json(classToClass(laboratories));
  }

  async associate(req: Request, res: Response): Promise<Response> {
    const { laboratory_id: laboratoryId, exam_id: examId } = req.params;

    const associateExamToLaboratory = container.resolve(
      AssociateExamToLaboratoryService,
    );
    await associateExamToLaboratory.execute({
      laboratoryId,
      examId,
    });

    return res.status(204).send();
  }

  async disassociate(req: Request, res: Response): Promise<Response> {
    const { laboratory_id: laboratoryId, exam_id: examId } = req.params;

    const disassociateExamToLaboratory = container.resolve(
      DisassociateExamToLaboratoryService,
    );
    await disassociateExamToLaboratory.execute({
      laboratoryId,
      examId,
    });

    return res.status(204).send();
  }
}

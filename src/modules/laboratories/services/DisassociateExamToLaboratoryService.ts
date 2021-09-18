import IExamsRepository from '../../exams/repositories/IExamsRepository';
import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

interface IRequest {
  laboratoryId: number;
  examId: number;
}

@injectable()
export default class DisassociateExamToLaboratoryService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,

    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}

  public async execute({ laboratoryId, examId }: IRequest): Promise<void> {
    const laboratory = await this.laboratoriesRepository.findById(laboratoryId);

    if (!laboratory) throw new AppError("Laboratory doesn't exist", 404);

    if (!laboratory.status) throw new AppError('Laboratory not activated');

    const exam = await this.examsRepository.findById(examId);

    if (!exam) throw new AppError("Exam doesn't exist", 404);

    if (!exam.status) throw new AppError('Exam not activated');      

    await this.laboratoriesRepository.removeExam({ laboratoryId, examId });
  }
}

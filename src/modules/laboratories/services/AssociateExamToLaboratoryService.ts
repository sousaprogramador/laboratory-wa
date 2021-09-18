import IExamsRepository from '@modules/exams/repositories/IExamsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

interface IRequest {
  laboratoryId: string;
  examId: string;
}

@injectable()
export default class AssociateExamToLaboratoryService {
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

    if (
      await this.laboratoriesRepository.findByIdAndExam({
        laboratoryId,
        examId,
      })
    )
      throw new AppError('Association already exist');

    laboratory.exams.push(exam);

    await Promise.all([
      this.laboratoriesRepository.save(laboratory),
      this.examsRepository.save(exam),
    ]);
  }
}

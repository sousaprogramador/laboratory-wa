import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IExamsRepository from '../repositories/IExamsRepository';

interface IRequest {
  examId: string;
}

@injectable()
export default class RemoveExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}

  public async execute({ examId }: IRequest): Promise<void> {
    const exam = await this.examsRepository.findById(examId);

    if (!exam) throw new AppError("Exam doesn't exist", 404);

    await this.examsRepository.remove(exam);
  }
}

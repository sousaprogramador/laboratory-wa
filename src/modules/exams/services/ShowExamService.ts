import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Exam from '../entities/Exam';
import IExamsRepository from '../repositories/IExamsRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class ShowExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Exam> {
    const exam = await this.examsRepository.findByName(name);

    if (!exam) throw new AppError("Exam doesn't exist", 404);

    return exam;
  }
}

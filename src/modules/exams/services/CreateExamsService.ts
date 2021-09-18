import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IExamsRepository from '../repositories/IExamsRepository';
import Exam from '../entities/Exam';

interface IRequest {
  name: string;
  type: 'analise clinica' | 'imagem';
}

@injectable()
export default class CreateExamsService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}

  public async execute(requests: IRequest[]): Promise<Exam[] | Exam> {
    const exams = await Promise.all(
      requests.map(async request => {
        if (await this.examsRepository.findByName(request.name))
          throw new AppError('Exam with same name are not allowed');

        return this.examsRepository.create(request);
      }),
    );

    if (exams.length === 1) return exams[0];

    return exams;
  }
}

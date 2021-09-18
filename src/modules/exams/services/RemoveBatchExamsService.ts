/* eslint-disable camelcase */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IExamsRepository from '../repositories/IExamsRepository';

interface IRequest {
  exam_id: string;
}

@injectable()
export default class RemoveBatchExamsService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}

  public async execute(requests: IRequest[]): Promise<void> {
    await Promise.all(
      requests.map(async request => {
        const exam = await this.examsRepository.findById(request.exam_id);

        if (!exam)
          throw new AppError(
            `Exam with id ${request.exam_id} doesn't exist`,
            404,
          );

        await this.examsRepository.remove(exam);
      }),
    );
  }
}

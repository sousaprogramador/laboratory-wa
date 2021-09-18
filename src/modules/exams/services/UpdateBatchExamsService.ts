/* eslint-disable camelcase */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Exam from '../entities/Exam';
import IExamsRepository from '../repositories/IExamsRepository';

interface IRequest {
  exam_id: string;
  name: string;
  type: 'analise clinica' | 'imagem';
  status: boolean;
}

@injectable()
export default class UpdateBatchExamsService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}

  public async execute(requests: IRequest[]): Promise<Exam[]> {
    const exams = await Promise.all(
      requests.map(async request => {
        const exam = await this.examsRepository.findById(request.exam_id);

        if (!exam) throw new AppError("Exam doesn't exist", 404);

        const sameNameExam = await this.examsRepository.findByName(
          request.name,
        );

        if (sameNameExam && sameNameExam.id !== exam.id)
          throw new AppError(`Exam with name ${request.name} already in use`);

        exam.name = request.name;
        exam.type = request.type;
        exam.status = request.status;
        await this.examsRepository.save(exam);

        return exam;
      }),
    );

    return exams;
  }
}

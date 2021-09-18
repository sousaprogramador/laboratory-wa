import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IExamsRepository from '../repositories/IExamsRepository';
import Exam from '../entities/Exam';

interface IRequest {
  examId: string;
  name: string;
  type: 'analise clinica' | 'imagem';
  status: boolean;
}

@injectable()
export default class UpdateExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}

  public async execute({
    examId,
    name,
    type,
    status,
  }: IRequest): Promise<Exam> {
    const exam = await this.examsRepository.findById(examId);

    if (!exam) throw new AppError("Exam doesn't exist", 404);

    const sameNameExam = await this.examsRepository.findByName(name);

    if (sameNameExam && sameNameExam.id !== exam.id)
      throw new AppError(`Exam with name ${name} already in use`);

    exam.name = name;
    exam.type = type;
    exam.status = status;
    await this.examsRepository.save(exam);

    return exam;
  }
}

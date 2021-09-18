import AppError from '@shared/errors/AppError';
import Exam from '../entities/Exam';
import { clinicalExam, imageExam } from '../mocks/exams';
import FakeExamsRepository from '../repositories/implementations/FakeExamsRepository';
import CreateExamsService from '../services/CreateExamsService';

let examsRepository: FakeExamsRepository;
let createExams: CreateExamsService;

describe('create exams', () => {
  beforeEach(async () => {
    examsRepository = new FakeExamsRepository();
    createExams = new CreateExamsService(examsRepository);
  });

  it('should create exams', async () => {
    const exams = (await createExams.execute([
      clinicalExam,
      imageExam,
    ])) as Exam[];

    expect(exams[0].id).toBeTruthy();
    expect(exams[1].id).toBeTruthy();
  });

  it('should create a exam', async () => {
    const exam = (await createExams.execute([clinicalExam])) as Exam;

    expect(exam.id).toBeTruthy();
  });

  it('should not create a exam if name already exist', async () => {
    await createExams.execute([clinicalExam]);

    await expect(createExams.execute([clinicalExam])).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

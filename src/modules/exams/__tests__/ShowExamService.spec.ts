import AppError from '@shared/errors/AppError';
import Exam from '../entities/Exam';
import { clinicalExam } from '../mocks/exams';
import FakeExamsRepository from '../repositories/implementations/FakeExamsRepository';
import ShowExamService from '../services/ShowExamService';

let examsRepository: FakeExamsRepository;
let showExam: ShowExamService;
let exam: Exam;

describe('show exam', () => {
  beforeEach(async () => {
    examsRepository = new FakeExamsRepository();
    showExam = new ShowExamService(examsRepository);

    exam = await examsRepository.create(clinicalExam);
  });

  it('should show a exam', async () => {
    const foundExam = await showExam.execute({ name: exam.name });

    expect(foundExam.id).toEqual(exam.id);
  });

  it('should not show a exam if name does not exist', async () => {
    await expect(
      showExam.execute({
        name: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

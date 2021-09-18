import AppError from '@shared/errors/AppError';
import Exam from '../entities/Exam';
import { clinicalExam } from '../mocks/exams';
import FakeExamsRepository from '../repositories/implementations/FakeExamsRepository';
import RemoveExamService from '../services/RemoveExamService';

let examsRepository: FakeExamsRepository;
let removeExam: RemoveExamService;
let exam: Exam;

describe('remove exam', () => {
  beforeEach(async () => {
    examsRepository = new FakeExamsRepository();
    removeExam = new RemoveExamService(examsRepository);

    exam = await examsRepository.create(clinicalExam);
  });

  it('should remove a exam', async () => {
    await removeExam.execute({
      examId: exam.id,
    });

    const removedExam = await examsRepository.findById(exam.id);
    expect(removedExam).toBeUndefined();
  });

  it('should not remove a exam if exam does not exist', async () => {
    await expect(
      removeExam.execute({
        examId: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

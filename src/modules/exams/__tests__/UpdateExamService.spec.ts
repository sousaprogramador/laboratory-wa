import AppError from '../../../shared/errors/AppError';
import Exam from '../entities/Exam';
import { clinicalExam } from '../mocks/exams';
import FakeExamsRepository from '../repositories/implementations/FakeExamsRepository';
import UpdateExamService from '../services/UpdateExamService';

let examsRepository: FakeExamsRepository;
let updateExam: UpdateExamService;
let exam: Exam;

describe('update exam', () => {
  beforeEach(async () => {
    examsRepository = new FakeExamsRepository();
    updateExam = new UpdateExamService(examsRepository);

    exam = await examsRepository.create(clinicalExam);
  });

  it('should update a exam', async () => {
    const updatedExam = await updateExam.execute({
      examId: exam.id,
      name: exam.name,
      type: 'imagem',
      status: true,
    });

    expect(updatedExam.id).toEqual(exam.id);
    expect(updatedExam.name).toEqual(exam.name);
  });

  it('should not update a exam if exam does not exist', async () => {
    await expect(
      updateExam.execute({
        examId: 1234,
        name: exam.name,
        type: 'imagem',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

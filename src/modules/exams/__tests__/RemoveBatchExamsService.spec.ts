import AppError from '@shared/errors/AppError';
import Exam from '../entities/Exam';
import { clinicalExam, imageExam } from '../mocks/exams';
import FakeExamsRepository from '../repositories/implementations/FakeExamsRepository';
import RemoveBatchExamsService from '../services/RemoveBatchExamsService';

let examsRepository: FakeExamsRepository;
let removeBatchExams: RemoveBatchExamsService;
let exams: Exam[];

describe('remove batch exams', () => {
  beforeEach(async () => {
    examsRepository = new FakeExamsRepository();
    removeBatchExams = new RemoveBatchExamsService(examsRepository);
    exams = [];
    exams.push(
      await examsRepository.create(clinicalExam),
      await examsRepository.create(imageExam),
    );
  });

  it('should remove batch exams', async () => {
    await removeBatchExams.execute(
      exams.map(exam => ({
        exam_id: exam.id,
      })),
    );

    let exam = await examsRepository.findById(exams[0].id);
    expect(exam).toBeUndefined();
    exam = await examsRepository.findById(exams[1].id);
    expect(exam).toBeUndefined();
  });

  it('should not remove batch exams if id does not exist', async () => {
    const requests = [{ exam_id: exams[0].id }, { exam_id: '1234' }];

    await expect(removeBatchExams.execute(requests)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

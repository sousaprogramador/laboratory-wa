import AppError from '@shared/errors/AppError';
import Exam from '../entities/Exam';
import { clinicalExam, imageExam } from '../mocks/exams';
import FakeExamsRepository from '../repositories/implementations/FakeExamsRepository';
import UpdateBatchExamsService from '../services/UpdateBatchExamsService';

let examsRepository: FakeExamsRepository;
let updateBatchExams: UpdateBatchExamsService;
let exams: Exam[];

describe('update batch Exams', () => {
  beforeEach(async () => {
    examsRepository = new FakeExamsRepository();
    updateBatchExams = new UpdateBatchExamsService(examsRepository);
    exams = [];
    exams.push(
      await examsRepository.create(clinicalExam),
      await examsRepository.create(imageExam),
    );
  });

  it('should update batch exams', async () => {
    const updatedExams = await updateBatchExams.execute([
      {
        exam_id: exams[0].id,
        name: 'new name',
        type: 'imagem',
        status: true,
      },
      {
        exam_id: exams[1].id,
        name: 'new name 2',
        type: 'imagem',
        status: true,
      },
    ]);

    expect(updatedExams[0].name).toEqual('new name');
    expect(updatedExams[1].name).toEqual('new name 2');
  });

  it('should not update batch exams if id does not exist', async () => {
    await expect(
      updateBatchExams.execute([
        {
          exam_id: '1234',
          name: 'new name',
          type: 'imagem',
          status: true,
        },
        {
          exam_id: exams[1].id,
          name: 'new name',
          type: 'imagem',
          status: true,
        },
      ]),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update batch exams if name already in use', async () => {
    await expect(
      updateBatchExams.execute([
        {
          exam_id: exams[0].id,
          name: exams[1].name,
          type: 'imagem',
          status: true,
        },
        {
          exam_id: exams[1].id,
          name: 'new name',
          type: 'imagem',
          status: true,
        },
      ]),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import { clinicalExam, imageExam } from '../mocks/exams';
import FakeExamsRepository from '../repositories/implementations/FakeExamsRepository';
import ListExamsService from '../services/ListExamsService';

let examsRepository: FakeExamsRepository;
let listExams: ListExamsService;

describe('list exams', () => {
  beforeEach(async () => {
    examsRepository = new FakeExamsRepository();
    listExams = new ListExamsService(examsRepository);

    await examsRepository.create(clinicalExam);
    await examsRepository.create(imageExam);
  });

  it('should list the clinical exams', async () => {
    const exams = await listExams.execute({
      status: false,
      type: 'analise clinica',
      paginationOptions: {
        limit: 10,
        page: 1,
      },
    });

    expect(exams.values[0].type).toEqual('analise clinica');
  });

  it('should list the image exams', async () => {
    const exams = await listExams.execute({
      status: false,
      type: 'imagem',
      paginationOptions: {
        limit: 10,
        page: 1,
      },
    });

    expect(exams.values[0].type).toEqual('imagem');
  });
});

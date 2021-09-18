import Exam from '../../../modules/exams/entities/Exam';
import { clinicalExam } from '../../exams/mocks/exams';
import FakeExamsRepository from '../../exams/repositories/implementations/FakeExamsRepository';
import AppError from '../../../shared/errors/AppError';
import Laboratory from '../entities/Laboratory';
import normalLaboratory from '../mocks/laboratories';
import FakeLaboratoriesRepository from '../repositories/implementations/FakeLaboratoriesRepository';
import DisassociateExamToLaboratoryService from '../services/DisassociateExamToLaboratoryService';

let laboratoriesRepository: FakeLaboratoriesRepository;
let examsRepository: FakeExamsRepository;
let disassociateExamToLaboratory: DisassociateExamToLaboratoryService;
let laboratory: Laboratory;
let exam: Exam;

describe('associate exam to laboratory', () => {
  beforeEach(async () => {
    laboratoriesRepository = new FakeLaboratoriesRepository();
    examsRepository = new FakeExamsRepository();
    disassociateExamToLaboratory = new DisassociateExamToLaboratoryService(
      laboratoriesRepository,
      examsRepository,
    );

    laboratory = await laboratoriesRepository.create(normalLaboratory);
    exam = await examsRepository.create(clinicalExam);

    await Promise.all([
      laboratoriesRepository.save(laboratory),
      examsRepository.save(exam),
    ]);
  });

  it('should not disassociate a exam to a laboratory if laboratory does not exist', async () => {
    await expect(
      disassociateExamToLaboratory.execute({
        laboratoryId: 1234,
        examId: exam.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not disassociate a exam to a laboratory if exam does not exist', async () => {
    await expect(
      disassociateExamToLaboratory.execute({
        laboratoryId: laboratory.id,
        examId: 1234,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not disassociate a exam to a laboratory if laboratory does not activated', async () => {
    await laboratoriesRepository.save(laboratory);

    await expect(
      disassociateExamToLaboratory.execute({
        laboratoryId: laboratory.id,
        examId: exam.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not disassociate a exam to a laboratory if exam does not activated', async () => {
    await examsRepository.save(exam);

    await expect(
      disassociateExamToLaboratory.execute({
        laboratoryId: laboratory.id,
        examId: exam.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not disassociate if association does not exist', async () => {
    await laboratoriesRepository.save(laboratory);

    await expect(
      disassociateExamToLaboratory.execute({
        laboratoryId: laboratory.id,
        examId: exam.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

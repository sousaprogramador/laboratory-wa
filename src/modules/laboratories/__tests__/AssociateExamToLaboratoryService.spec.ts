import Exam from '@modules/exams/entities/Exam';
import { clinicalExam } from '@modules/exams/mocks/exams';
import FakeExamsRepository from '@modules/exams/repositories/implementations/FakeExamsRepository';
import AppError from '@shared/errors/AppError';
import Laboratory from '../entities/Laboratory';
import normalLaboratory from '../mocks/laboratories';
import FakeLaboratoriesRepository from '../repositories/implementations/FakeLaboratoriesRepository';
import AssociateExamToLaboratoryService from '../services/AssociateExamToLaboratoryService';

let laboratoriesRepository: FakeLaboratoriesRepository;
let examsRepository: FakeExamsRepository;
let associateExamToLaboratory: AssociateExamToLaboratoryService;
let laboratory: Laboratory;
let exam: Exam;

describe('associate exam to laboratory', () => {
  beforeEach(async () => {
    laboratoriesRepository = new FakeLaboratoriesRepository();
    examsRepository = new FakeExamsRepository();
    associateExamToLaboratory = new AssociateExamToLaboratoryService(
      laboratoriesRepository,
      examsRepository,
    );

    laboratory = await laboratoriesRepository.create(normalLaboratory);
    exam = await examsRepository.create(clinicalExam);
    laboratory.status = true;
    exam.status = true;
    await Promise.all([
      laboratoriesRepository.save(laboratory),
      examsRepository.save(exam),
    ]);
  });

  it('should associate a exam to a laboratory', async () => {
    await associateExamToLaboratory.execute({
      laboratoryId: laboratory.id,
      examId: exam.id,
    });

    const associatedLaboratory = await laboratoriesRepository.findById(
      laboratory.id,
    );

    expect(associatedLaboratory?.exams.length).toBeGreaterThan(0);
  });

  it('should not associate a exam to a laboratory if laboratory does not exist', async () => {
    await expect(
      associateExamToLaboratory.execute({
        laboratoryId: '1234',
        examId: exam.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not associate a exam to a laboratory if exam does not exist', async () => {
    await expect(
      associateExamToLaboratory.execute({
        laboratoryId: laboratory.id,
        examId: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not associate a exam to a laboratory if laboratory does not activated', async () => {
    laboratory.status = false;
    await laboratoriesRepository.save(laboratory);

    await expect(
      associateExamToLaboratory.execute({
        laboratoryId: laboratory.id,
        examId: exam.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not associate a exam to a laboratory if exam does not activated', async () => {
    exam.status = false;
    await examsRepository.save(exam);

    await expect(
      associateExamToLaboratory.execute({
        laboratoryId: laboratory.id,
        examId: exam.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not associate if association already exist', async () => {
    laboratory.exams.push(exam);
    await laboratoriesRepository.save(laboratory);

    await expect(
      associateExamToLaboratory.execute({
        laboratoryId: laboratory.id,
        examId: exam.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

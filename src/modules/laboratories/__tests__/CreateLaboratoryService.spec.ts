import AppError from '@shared/errors/AppError';
import Laboratory from '../entities/Laboratory';
import normalLaboratory from '../mocks/laboratories';
import FakeLaboratoriesRepository from '../repositories/implementations/FakeLaboratoriesRepository';
import CreateLaboratoryService from '../services/CreateLaboratoryService';

let laboratoriesRepository: FakeLaboratoriesRepository;
let createLaboratory: CreateLaboratoryService;

describe('create laboratory', () => {
  beforeEach(async () => {
    laboratoriesRepository = new FakeLaboratoriesRepository();
    createLaboratory = new CreateLaboratoryService(laboratoriesRepository);
  });

  it('should create a laboratory', async () => {
    const laboratory = (await createLaboratory.execute([
      normalLaboratory,
    ])) as Laboratory;

    expect(laboratory.id).toBeTruthy();
  });

  it('should create more than one laboratory', async () => {
    const laboratories = (await createLaboratory.execute([
      normalLaboratory,
      {
        ...normalLaboratory,
        name: 'New Laboratory',
      },
    ])) as Laboratory[];

    expect(laboratories[0].id).toBeTruthy();
    expect(laboratories[1].id).toBeTruthy();
  });

  it('should create a laboratory with same name', async () => {
    await createLaboratory.execute([normalLaboratory]);

    await expect(
      createLaboratory.execute([normalLaboratory]),
    ).rejects.toBeInstanceOf(AppError);
  });
});

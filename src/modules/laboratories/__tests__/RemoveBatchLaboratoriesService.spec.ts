import AppError from '@shared/errors/AppError';
import Laboratory from '../entities/Laboratory';
import FakeLaboratoriesRepository from '../repositories/implementations/FakeLaboratoriesRepository';
import RemoveBatchLaboratories from '../services/RemoveBatchLaboratoriesService';
import normalLaboratory from '../mocks/laboratories';

let laboratoriesRepository: FakeLaboratoriesRepository;
let removeBatchLaboratories: RemoveBatchLaboratories;
let laboratories: Laboratory[];

describe('remove batch laboratories', () => {
  beforeEach(async () => {
    laboratoriesRepository = new FakeLaboratoriesRepository();
    removeBatchLaboratories = new RemoveBatchLaboratories(
      laboratoriesRepository,
    );
    laboratories = [];
    laboratories.push(
      await laboratoriesRepository.create(normalLaboratory),
      await laboratoriesRepository.create({
        ...normalLaboratory,
        name: 'new laboratory',
      }),
    );
  });

  it('should remove batch laboratories', async () => {
    await removeBatchLaboratories.execute(
      laboratories.map(laboratory => ({
        laboratory_id: laboratory.id,
      })),
    );

    let laboratory = await laboratoriesRepository.findById(laboratories[0].id);
    expect(laboratory).toBeUndefined();
    laboratory = await laboratoriesRepository.findById(laboratories[1].id);
    expect(laboratory).toBeUndefined();
  });

  it('should not remove batch laboratories if id does not exist', async () => {
    const requests = [
      { laboratory_id: laboratories[0].id },
      { laboratory_id: '1234' },
    ];

    await expect(
      removeBatchLaboratories.execute(requests),
    ).rejects.toBeInstanceOf(AppError);
  });
});

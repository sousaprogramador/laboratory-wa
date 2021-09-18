import AppError from '@shared/errors/AppError';
import Laboratory from '../entities/Laboratory';
import normalLaboratory from '../mocks/laboratories';
import FakeLaboratoriesRepository from '../repositories/implementations/FakeLaboratoriesRepository';
import RemoveLaboratoryService from '../services/RemoveLaboratoryService';

let laboratoriesRepository: FakeLaboratoriesRepository;
let removeLaboratory: RemoveLaboratoryService;
let laboratory: Laboratory;

describe('remove laboratory', () => {
  beforeEach(async () => {
    laboratoriesRepository = new FakeLaboratoriesRepository();
    removeLaboratory = new RemoveLaboratoryService(laboratoriesRepository);

    laboratory = await laboratoriesRepository.create(normalLaboratory);
  });

  it('should remove laboratory', async () => {
    await removeLaboratory.execute({
      laboratoryId: laboratory.id,
    });

    const removedLaboratory = await laboratoriesRepository.findById(
      laboratory.id,
    );
    expect(removedLaboratory).toBeUndefined();
  });

  it('should not remove a laboratory if id does not exist', async () => {
    await expect(
      removeLaboratory.execute({
        laboratoryId: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

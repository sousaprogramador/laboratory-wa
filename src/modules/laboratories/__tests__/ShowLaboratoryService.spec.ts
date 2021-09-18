import AppError from '@shared/errors/AppError';
import Laboratory from '../entities/Laboratory';
import normalLaboratory from '../mocks/laboratories';
import FakeLaboratoriesRepository from '../repositories/implementations/FakeLaboratoriesRepository';
import ShowLaboratoryService from '../services/ShowLaboratoryService';

let laboratoriesRepository: FakeLaboratoriesRepository;
let showLaboratory: ShowLaboratoryService;
let laboratory: Laboratory;

describe('show laboratory', () => {
  beforeEach(async () => {
    laboratoriesRepository = new FakeLaboratoriesRepository();
    showLaboratory = new ShowLaboratoryService(laboratoriesRepository);

    laboratory = await laboratoriesRepository.create(normalLaboratory);
  });

  it('should show laboratory by id', async () => {
    const foundLaboratory = await showLaboratory.execute({
      laboratoryId: laboratory.id,
    });

    expect(foundLaboratory).toBeTruthy();
  });

  it('should not show a laboratory if laboratory id does not exist', async () => {
    await expect(
      showLaboratory.execute({
        laboratoryId: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';
import Laboratory from '../entities/Laboratory';
import normalLaboratory from '../mocks/laboratories';
import FakeLaboratoriesRepository from '../repositories/implementations/FakeLaboratoriesRepository';
import UpdateLaboratoryService from '../services/UpdateLaboratoryService';

let laboratoriesRepository: FakeLaboratoriesRepository;
let updateLaboratory: UpdateLaboratoryService;
let laboratory: Laboratory;

describe('show laboratory', () => {
  beforeEach(async () => {
    laboratoriesRepository = new FakeLaboratoriesRepository();
    updateLaboratory = new UpdateLaboratoryService(laboratoriesRepository);

    laboratory = await laboratoriesRepository.create(normalLaboratory);
  });

  it('should update laboratory', async () => {
    const foundLaboratory = await updateLaboratory.execute({
      laboratoryId: laboratory.id,
      name: 'new name',
      address: 'new address',
      status: true,
    });

    expect(foundLaboratory.id).toEqual(laboratory.id);
    expect(foundLaboratory.name).toEqual('new name');
    expect(foundLaboratory.address).toEqual('new address');
    expect(foundLaboratory.status).toEqual(true);
  });

  it('should not update a laboratory if laboratory id does not exist', async () => {
    await expect(
      updateLaboratory.execute({
        laboratoryId: '1234',
        name: 'new name',
        address: 'new address',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update a laboratory if name already in use', async () => {
    await laboratoriesRepository.create({
      name: 'new name',
      address: 'new address',
    });

    await expect(
      updateLaboratory.execute({
        laboratoryId: laboratory.id,
        name: 'new name',
        address: 'new address',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

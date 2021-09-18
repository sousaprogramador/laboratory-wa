import AppError from '@shared/errors/AppError';
import Laboratory from '../entities/Laboratory';
import FakeLaboratoriesRepository from '../repositories/implementations/FakeLaboratoriesRepository';
import UpdateBatchLaboratoriesService from '../services/UpdateBatchLaboratoriesService';
import normalLaboratory from '../mocks/laboratories';

let laboratoriesRepository: FakeLaboratoriesRepository;
let updateBatchLaboratories: UpdateBatchLaboratoriesService;
let laboratories: Laboratory[];

describe('update batch laboratories', () => {
  beforeEach(async () => {
    laboratoriesRepository = new FakeLaboratoriesRepository();
    updateBatchLaboratories = new UpdateBatchLaboratoriesService(
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

  it('should update batch laboratories', async () => {
    const updatedLaboratories = await updateBatchLaboratories.execute([
      {
        laboratory_id: laboratories[0].id,
        name: 'new name',
        address: 'new address',
        status: true,
      },
      {
        laboratory_id: laboratories[1].id,
        name: 'new name 2',
        address: 'new address',
        status: true,
      },
    ]);

    expect(updatedLaboratories[0].name).toEqual('new name');
    expect(updatedLaboratories[1].name).toEqual('new name 2');
  });

  it('should not update batch laboratories if id does not exist', async () => {
    await expect(
      updateBatchLaboratories.execute([
        {
          laboratory_id: '1234',
          name: 'new name',
          address: 'new address',
          status: true,
        },
        {
          laboratory_id: laboratories[1].id,
          name: 'new name',
          address: 'new address',
          status: true,
        },
      ]),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update batch laboratories if name already in use', async () => {
    await expect(
      updateBatchLaboratories.execute([
        {
          laboratory_id: laboratories[0].id,
          name: 'new laboratory',
          address: 'new address',
          status: true,
        },
        {
          laboratory_id: laboratories[1].id,
          name: 'new name',
          address: 'new address',
          status: true,
        },
      ]),
    ).rejects.toBeInstanceOf(AppError);
  });
});

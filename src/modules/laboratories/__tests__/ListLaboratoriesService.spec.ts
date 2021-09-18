import Laboratory from '../entities/Laboratory';
import normalLaboratory from '../mocks/laboratories';
import FakeLaboratoriesRepository from '../repositories/implementations/FakeLaboratoriesRepository';
import ListLaboratoriesServices from '../services/ListLaboratoriesServices';

let laboratoriesRepository: FakeLaboratoriesRepository;
let listLaboratories: ListLaboratoriesServices;
let laboratory: Laboratory;

describe('list laboratories', () => {
  beforeEach(async () => {
    laboratoriesRepository = new FakeLaboratoriesRepository();
    listLaboratories = new ListLaboratoriesServices(laboratoriesRepository);

    laboratory = await laboratoriesRepository.create(normalLaboratory);
  });

  it('should list the laboratories not active', async () => {
    const data = await listLaboratories.execute({
      status: false,
      paginationOptions: {
        limit: 10,
        page: 1,
      },
    });

    expect(data.values[0].id).toEqual(laboratory.id);
    expect(data.values[0].status).toEqual(false);
  });

  it('should list the laboratories active', async () => {
    laboratory.status = true;
    await laboratoriesRepository.save(laboratory);

    const data = await listLaboratories.execute({
      status: true,
      paginationOptions: {
        limit: 10,
        page: 1,
      },
    });

    expect(data.values[0].id).toEqual(laboratory.id);
    expect(data.values[0].status).toEqual(true);
  });
});

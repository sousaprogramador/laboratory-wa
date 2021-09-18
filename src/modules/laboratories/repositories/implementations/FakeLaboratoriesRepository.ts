import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import Pagination from '@modules/pagination';
import Laboratory from '../../entities/Laboratory';
import ILaboratoriesRepository from '../ILaboratoriesRepository';
import ICreateLaboratoryDTO from '../../dtos/ICreateLaboratoryDTO';
import IFindByIdAndExamDTO from '../../dtos/IFindByIdAndExamDTO';
import IRemoveExamDTO from '../../dtos/IRemoveExamDTO';

class FakeLaboratoriesRepository implements ILaboratoriesRepository {
  private laboratories: Laboratory[] = [];

  public async create(data: ICreateLaboratoryDTO): Promise<Laboratory> {
    const laboratory = new Laboratory();

    this.laboratories.push(laboratory);

    return laboratory;
  }

  public async save(laboratory: Laboratory): Promise<Laboratory> {
    const index = this.laboratories.findIndex(
      findLaboratory => findLaboratory.id === laboratory.id,
    );

    this.laboratories[index] = laboratory;

    return laboratory;
  }

  public async remove(laboratory: Laboratory): Promise<Laboratory> {
    const index = this.laboratories.findIndex(
      findLaboratory => findLaboratory.id === laboratory.id,
    );

    this.laboratories.splice(index, 1);

    return laboratory;
  }

  public async removeExam({
    laboratoryId,
    examId,
  }: IRemoveExamDTO): Promise<void> {
    this.laboratories = this.laboratories.map(foundLaboratory => {
      if (foundLaboratory.id !== laboratoryId) return foundLaboratory;
      return foundLaboratory;
    });
  }

  public async findById(laboratoryId: number): Promise<Laboratory | undefined> {
    return this.laboratories.find(laboratory => laboratory.id === laboratoryId);
  }

  public async findByName(name: string): Promise<Laboratory | undefined> {
    return this.laboratories.find(laboratory => laboratory.name === name);
  }

  public async findAllByStatus(
    status: boolean,
    { limit, page }: IPaginationOptions,
  ): Promise<Pagination<Laboratory>> {

    const total = this.laboratories.length;

    return {
      values: this.laboratories.slice((page - 1) * limit, page * limit),
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

}

export default FakeLaboratoriesRepository;

import IPaginationOptions from "@modules/pagination/interfaces/IPaginationOptions";
import Pagination from "@modules/pagination";
import { Repository,getRepository } from "typeorm";
import User from "@modules/users/entities/User";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUsersRepository from "../IUsersRepository";

class TypeORMUsersRepository implements IUsersRepository{
  private ormRepository: Repository<User>

  constructor(){
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO){
    const user = this.ormRepository.create({
      ...data
    })

    return user;
  }

  public async findByMail(email:String):Promise<User | undefined>{
    const user = this.ormRepository.findOne({ where: { email: email } });
    return user;
  }

  public async findAll( { limit, page }  : IPaginationOptions):Promise<Pagination<User>>{
    let query = this.ormRepository
      .createQueryBuilder('users')

    const values = await query
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    const total = await query.getCount();
    return {
      values,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

}

export default TypeORMUsersRepository;
import IPaginationOptions from "@modules/pagination/interfaces/IPaginationOptions";
import Pagination from "@modules/pagination";
import User from "../entities/User";
import ICreateUserDTO from "../dtos/ICreateUserDTO";

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  //save(user: User):Promise<User>;
  //remove(user: User):Promise<User>;
  //findById(userId:number):Promise<User|undefined>;
  findByMail(email:string):Promise<User|undefined>;
  findAll(
    paginationOptions: IPaginationOptions,
  ): Promise<Pagination<User>>;
}
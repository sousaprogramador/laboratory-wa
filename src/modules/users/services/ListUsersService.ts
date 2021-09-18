import Pagination from "@modules/pagination";
import IPaginationOptions from "@modules/pagination/interfaces/IPaginationOptions";
import { inject , injectable } from "tsyringe";
import User from "../entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  paginationOptions: IPaginationOptions;
}

@injectable()
export default class ListExamsService {
  constructor(
    @inject('UsersRepository')
    private UsersRepository: IUsersRepository,
  ) {}

  public async execute({
    paginationOptions,
  }: IRequest): Promise<Pagination<User>> {
    const data = await this.UsersRepository.findAll(
      paginationOptions,
    );

    return data;
  }
}
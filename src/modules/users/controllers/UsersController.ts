import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUsersService from '../services/CreateUsersService';
import ListUsersService from '../services/ListUsersService';
import AuthenticateUserService from '../services/AuthenticateUserService';


export default class UsersController {
  async index(req: Request, res: Response): Promise<Response> {
    const { paginationOptions } = req;

    const listUsers = container.resolve(ListUsersService);
    const data = await listUsers.execute({
      paginationOptions,
    });

    return res.json(classToClass(data));
  }

  async create(req: Request, res: Response): Promise<Response> {
    if (!Array.isArray(req.body)) req.body = [req.body];

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute(req.body);

    return res.status(201).json(classToClass(user));
  }

  async login(req: Request, res: Response):Promise<Response>{
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const {token} = await authenticateUser.execute({
        email,
        password
    });

    return res.json({token});
  }
}
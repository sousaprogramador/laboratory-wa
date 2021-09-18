import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import TypeORMUsersRepository from '@modules/users/repositories/implementations/TypeORMUsersRepository';

import ILaboratoriesRepository from '@modules/laboratories/repositories/ILaboratoriesRepository';
import TypeORMLaboratoriesRepository from '@modules/laboratories/repositories/implementations/TypeORMLaboratoriesRepository';

import IExamsRepository from '@modules/exams/repositories/IExamsRepository';
import TypeORMExamsRepository from '@modules/exams/repositories/implementations/TypeORMExamsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  TypeORMUsersRepository
)

container.registerSingleton<ILaboratoriesRepository>(
  'LaboratoriesRepository',
  TypeORMLaboratoriesRepository,
);

container.registerSingleton<IExamsRepository>(
  'ExamsRepository',
  TypeORMExamsRepository,
);
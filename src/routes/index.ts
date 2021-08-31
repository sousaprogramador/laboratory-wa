import { Router } from 'express';

import usersRouter from './users.routes';
import laboratoryRouter from './laboratory.routes';
import examsRouter from './exams.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/laboratory', laboratoryRouter);
routes.use('/exam', examsRouter);

export default routes;
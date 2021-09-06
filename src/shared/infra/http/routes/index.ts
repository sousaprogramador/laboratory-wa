import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import laboratoryRouter from '@modules/laboratories/infra/http/routes/laboratory.routes';
import examsRouter from '@modules/exams/infra/http/routes/exams.routes';


const routes = Router();

routes.use('/user', usersRouter);
routes.use('/laboratory', laboratoryRouter);
routes.use('/exam', examsRouter);

export default routes;
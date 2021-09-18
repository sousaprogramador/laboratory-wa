import { Router } from 'express';

import usersRouter from '@modules/users/routes/users.routes';
import laboratoryRouter from '@modules/laboratories/routes/laboratories.router';
import examsRouter from '@modules/exams/routes/exams.router';


const routes = Router();

routes.use('/user', usersRouter);
routes.use('/laboratory', laboratoryRouter);
routes.use('/exam', examsRouter);

export default routes;
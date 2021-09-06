import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./swagger.json');

import routes from '@shared/infra/http/routes';
import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

let options = {
    customSiteTitle: "Api Rest"
}

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});


app.listen(4000, () => {
    console.log('✔✔ Server Running on port 4000');
});

export default app;
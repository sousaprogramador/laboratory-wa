import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateLaboratoryService from '@modules/laboratories/services/CreateLaboratoryService';
import DeleteLaboratoryService from '@modules/laboratories/services/DeleteLaboratoryService';
import UpdateLaboratoryService from '@modules/laboratories/services/UpdateLaboratoryService';

import Laboratory from '../../typeorm/entities/Laboratory';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ShowLaboratoryService from '@modules/laboratories/services/ShowLaboratoryService';

const laboratoryRouter = Router();

laboratoryRouter.use(ensureAuthenticated);

laboratoryRouter.get('/', async (request, response) => {
    const laboratoryRepository = getRepository(Laboratory);

    const laboratoryService = new ShowLaboratoryService();

    const laboratory = await laboratoryService.execute();

    return response.json(laboratory);
});

laboratoryRouter.post('/', async (request, response) => {
    const laboratoryData = request.body;

    const createLaboratory = new CreateLaboratoryService();

    const newLaboratory = await createLaboratory.execute(laboratoryData);

    return response.json(newLaboratory);
});

laboratoryRouter.patch('/:id', async (request, response) => {
    const {id} = request.params;
    const {name, address, status} = request.body;

    const updateLaboratory = new UpdateLaboratoryService();

    const laboratory = await updateLaboratory.execute({
        id,
        name,
        address,
        status
    });

    return response.status(200).json(laboratory);

});

laboratoryRouter.delete('/:id', async (request, response) => {
    const {id} = request.params;

    const deleteLaboratory = new DeleteLaboratoryService();

    const laboratory = await deleteLaboratory.execute({id: Number(id)});

    return response.status(204).json(laboratory);

});

export default laboratoryRouter;
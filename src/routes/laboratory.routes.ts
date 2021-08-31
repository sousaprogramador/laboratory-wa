import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateLaboratoryService from '../services/CreateLaboratoryService';
import DeleteLaboratoryService from '../services/DeleteLaboratoryService';
import UpdateLaboratoryService from '../services/UpdateLaboratoryService';

import Laboratory from '../models/Laboratory';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const laboratoryRouter = Router();

laboratoryRouter.use(ensureAuthenticated);

laboratoryRouter.get('/', async (request, response) => {
    const laboratoryRepository = getRepository(Laboratory);

    const laboratory = await laboratoryRepository.find({where: {status: "ativo"}});

    return response.json(laboratory);
});

laboratoryRouter.post('/', async (request, response) => {
    const {
        name,
        address
    } = request.body;

    const createLaboratory = new CreateLaboratoryService();

    const newLaboratory = await createLaboratory.execute({
        name,
        address,
    });

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
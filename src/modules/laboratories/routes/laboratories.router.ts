import pagination from '@modules/pagination/middlewares/pagination';
import { Router } from 'express';
import LaboratoriesController from '../controllers/LaboratoriesController';

const router = Router();

const laboratoriesController = new LaboratoriesController();

router.post(
  '/',
  laboratoriesController.create,
);

router.get(
  '/',
  pagination,
  laboratoriesController.list,
);

router.delete(
  '/',
  laboratoriesController.batchRemove,
);

router.put(
  '/',
  laboratoriesController.batchUpdate,
);

router.get(
  '/:laboratory_id',
  laboratoriesController.show,
);

router.delete(
  '/:laboratory_id',
  laboratoriesController.remove,
);

router.put(
  '/:laboratory_id',
  laboratoriesController.update,
);

router.post(
  '/:laboratory_id/exam/:exam_id',
  laboratoriesController.associate,
);

router.delete(
  '/:laboratory_id/exam/:exam_id',
  laboratoriesController.disassociate,
);

export default router;

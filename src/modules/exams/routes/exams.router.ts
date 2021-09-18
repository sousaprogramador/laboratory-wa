import pagination from '@modules/pagination/middlewares/pagination';
import { Router } from 'express';
import ExamsController from '../controllers/ExamsController';

const router = Router();
const examsController = new ExamsController();

router.post(
  '/',
  examsController.create,
);

router.get(
  '/',
  pagination,
  examsController.list,
);

router.delete(
  '/:exam_id',
  examsController.remove,
);

router.put(
  '/:exam_id',
  examsController.update,
);

router.get(
  '/:name',
  examsController.show,
);

router.delete(
  '/',
  examsController.batchRemove,
);

router.put(
  '/',
  examsController.batchUpdate,
);

export default router;

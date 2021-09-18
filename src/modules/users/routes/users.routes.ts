import pagination from '@modules/pagination/middlewares/pagination';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const router = Router();
const usersController = new UsersController();

router.get(
  '/',
  pagination,
  usersController.index,
);
router.post(
  '/',
  usersController.create,
);
router.post(
  '/login',
  usersController.login,
);

export default router;
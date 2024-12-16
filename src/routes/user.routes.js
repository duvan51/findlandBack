import express from 'express';
import { registerUser, authUser, getAlluser, getUserByid, deleteUserById  } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

router.delete('/:id', deleteUserById)


router.get('/', getAlluser);
router.get('/:id', getUserByid);


export default router;

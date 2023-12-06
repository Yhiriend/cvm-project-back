import {Router} from 'express';
import { signInUser, loginUser, updateUser, getUserFromToken } from '../controllers/user.controller';
import validateToken from './validate-token';

const router = Router();

router.post('/signin', signInUser);
router.post('/login', loginUser);
router.post('/update', validateToken, updateUser);
router.get('/getuser', validateToken, getUserFromToken)

export default router;
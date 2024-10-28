import express from 'express';
import { bookMark, follower, getMyProfile, login, logout, otherUser, register, unFollow } from '../controller/user.js';
import isAuthenticated from '../auth.js';
// import isAuthenticated from '../auth.js';

const router = express.Router();

router.post('/register',  register)
router.post('/login',login)
router.get('/logout',logout)
router.put('/like/:id', isAuthenticated, bookMark)
router.get('/profile/:id', isAuthenticated, getMyProfile)
router.get('/otherUser/:id', isAuthenticated, otherUser)
router.post('/follower/:id', isAuthenticated, follower)
router.post('/unfollow/:id', isAuthenticated, unFollow)
export default router;


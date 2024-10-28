import express from 'express';
import { deleteTweet, getAllTweet, getFollowingTweet, likeOrDisLike, tweet } from '../controller/tweet.js';

 import isAuthenticated from '../auth.js';

const router = express.Router();

router.post('/create', isAuthenticated, tweet)
router.delete('/deltweet/:id', isAuthenticated, deleteTweet)
router.put('/like/:id', isAuthenticated, likeOrDisLike)
router.get('/alltweet/:id', isAuthenticated, getAllTweet)
router.get('/allfollowing/:id', isAuthenticated, getFollowingTweet)


export default router;


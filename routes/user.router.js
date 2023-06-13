const { login, signup } = require('../controllers/user.controller');
const authorize = require('../middlewares/authorization');

const userRouter = require('express').Router();

userRouter.post('/login', login);
userRouter.post('/signup', authorize(['USER.CREATE', 'USER.*']), signup);

module.exports = userRouter;

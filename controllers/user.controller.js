const { sign } = require('jsonwebtoken');
const { createUser, loginUser } = require('../models/User');

const signup = async (req, res, next) => {
   try {
      let { username, email, password } = req.body;
      let user = await createUser(username, email, password);
      return res.status(201).json({
         message: 'user created',
         data: {
            token: sign(user, process.env.JWT_SECRET, { expiresIn: '1d' }),
         },
      });
   } catch (error) {
      next(error);
   }
};

const login = async (req, res, next) => {
   try {
      let { email, password } = req.body;
      let user = await loginUser(email, password);
      if (!user) return res.status(401).json({ message: 'invalid credentials' });
      return res.status(200).json({
         message: 'logged in',
         data: {
            token: sign(user, process.env.JWT_SECRET, { expiresIn: '1d' }),
         },
      });
   } catch (error) {
      next(error);
   }
};

module.exports = { signup, login };

let authenticate = (req, res, next) => {
   const token = req.headers['Authorization'];

   if (!token) return res.status(401).json({ messsage: 'token is required' });

   jwt.verify(token, secretKey, (err, user) => {
      if (err) {
         return res.status(401).json({ messsage: 'invalid token' });
      }

      req.user = user;
      next();
   });
};

module.exports = authenticate;

function errorHandler(err, req, res, next) {
   if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
   }

   if (err.name === 'QueryError') {
      return res.status(500).json({ error: 'Database error occurred' });
   }

   return res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = errorHandler;

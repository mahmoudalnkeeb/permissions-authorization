const express = require('express');
const cors = require('cors');
const mainRouter = require('./routes/index.router');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use(mainRouter);
app.use(errorHandler);
app.listen(port, () => console.log(`app listening on port ${port}!`));

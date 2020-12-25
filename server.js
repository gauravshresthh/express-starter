const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(morgan('dev'));
app.use(express.json());

const PORT = 3000;

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

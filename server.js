const app = require('./app');
const dotenv = require('dotenv');
const mongooose = require('mongoose');

const Tour = require('./models/tourModel');

dotenv.config({ path: './config.env' });

mongooose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    `Connected to MongoDB...`;
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

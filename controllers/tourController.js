const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(err);
    }
  );

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (tour) {
    return res
      .status(200)
      .json({ status: 'success', msg: 'Updated the course' });
  }
  res.status(404).json({
    status: 'failed',
    data: { msg: `Tour with the given id: ${id} is invalid` },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (tour) {
    return res
      .status(200)
      .json({ status: 'success', results: tours.length, data: { tour } });
  }
  res.status(404).json({
    status: 'failed',
    data: { msg: `Invalid ID` },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (tour) {
    return res.status(204).json({ status: 'success', data: null });
  }
  res.status(404).json({
    status: 'failed',
    data: { msg: `Invalid ID` },
  });
};

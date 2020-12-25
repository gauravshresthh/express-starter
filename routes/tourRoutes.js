const express = require('express');
const fs = require('fs');
const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const getTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
const mongooose = require('mongoose');

const tourSchema = new mongooose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    minlength: 5,
    maxlength: 40,
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongooose.model('Tour', tourSchema);

module.exports = Tour;

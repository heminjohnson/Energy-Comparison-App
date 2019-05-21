const mongoose = require('mongoose')
const validator = require('validator')

const Products = mongoose.model('Products', {
  tariffName: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['A', 'B']
  },
  annualCosts: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('annualCosts must be a positive number')
      }
    }
  }
})

module.exports = Products

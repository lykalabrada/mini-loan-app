const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoanSchema = new Schema({
  full_name: {
    type: String,
    required: true,
    default: 'John Doe'
  },
  email: {
    type: String,
    required: true,
    default: 'johndoe@mail.com'
  },
  loan_balance: {
    type: Number,
    required: true
  },
  loan_type: {
    type: String,
    enum: ['Personal','Business']
  },
  loan_amount: {
    type: Number,
    required: true
  },
  loan_term: {
    type: Number,
    required: true
  },
  loan_approved: {
    type: Boolean,
    default: true
  },
  date_applied: {
    type: Date,
    required: true,
    default: Date.now
  },
  weekly_payment: {
    type: Number
  },
})

module.exports = Loan = mongoose.model('loan', LoanSchema)

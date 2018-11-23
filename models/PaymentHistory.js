const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentHistorySchema = new Schema({
  loan: {
    type: Schema.Types.ObjectId,
		ref : 'loan'
  },
  amount_paid: {
    type: Number
  },
  remaining_balance: {
    type: Number
  },
  date_paid: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = PaymentHistory = mongoose.model('payment_history', PaymentHistorySchema)

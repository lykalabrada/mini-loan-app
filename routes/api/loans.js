const express = require('express')
const router = express.Router()

const Loan = require('../../models/Loan')
const PaymentHistory = require('../../models/PaymentHistory')

// @route GET api/loans
// @desc  Get All Loans
router.get('/', (req, res) => {
  Loan.find()
    .sort({ date_applied: -1 })
    .then(loans => res.json(loans))
})

// @route GET api/loans/:id
// @desc  Get af Loan
router.get('/:id', (req, res) => {
  Loan.findById(req.params.id)
    .then(loan => res.json(loan))
})

// @route POST api/loans
// @desc  Create a new Loan
router.post('/', (req, res) => {
  const { full_name,email,loan_amount,loan_type,loan_term } = req.body
  const weekly_payment = loan_amount / (loan_term * 4)
  const newLoan = new Loan({
    loan_type,
    loan_amount,
    loan_term,
    weekly_payment,
    loan_balance: loan_amount,
  })

  newLoan.save().then(loan => res.json(loan))
})

// @route PUT api/loans
// @desc  Update a Loan
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const amount_paid = Number(req.body.amount_paid)
  Loan.findOneAndUpdate({_id},{$inc:{loan_balance:-amount_paid}},{new:true})
    .then((loan) => {
      const history = new PaymentHistory({
        loan:loan._id,
        remaining_balance:loan.loan_balance,
        amount_paid
      })
      history.save().then(payment=>res.json({payment,loan}))
    })
})

// @route GET api/loans/history/:id
// @desc  Get All Payment History per Loan
router.get('/history/:id', (req, res) => {
  PaymentHistory.find({loan:req.params.id})
    .populate('loan')
    .sort({ date_paid: 1 })
    .then(payments => res.json(payments))
})

module.exports = router

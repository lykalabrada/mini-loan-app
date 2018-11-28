import React, { Component, Fragment } from 'react'
import { Row, Col, Card, CardBody, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import { getLoans } from '../actions/loanActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

export class LoanList extends Component {
  componentDidMount() {
    this.props.getLoans()
  }

  render() {
    const { loans } = this.props.item
    return (
      <Fragment>
        <h1 className="mb-5">Your Loans</h1>


          <Card className=" mb-5">
            <CardBody className="text-center">
              <Row>
              <Col md="4">
                <h3>
                {loans.length}
                </h3>
                <div>Total Loans</div>
              </Col>
              <Col md="4">
                <h3>
                {
                  loans.reduce((sum, i) => (
                    sum += i.loan_balance
                  ), 0)
                  .toLocaleString('en-US', {maximumFractionDigits:2,minimumFractionDigits:2})
                }
                </h3>
                <div>Total Balance</div>
              </Col>
              <Col md="4">
                  <Link to="/" size="lg" color="secondary" className="btn btn-success btn-lg">Add new Loan</Link>
              </Col>
              </Row>
            </CardBody>
          </Card>


        <Table striped>
        <thead>
          <tr>
            <th>Date Applied</th>
            <th>Full Name</th>
            <th>Term</th>
            <th>Loan Amount</th>
            <th>Loan Balance</th>
            <th>Weekly Payment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loans.map(({ _id, full_name, loan_balance, loan_type, loan_amount, loan_term, date_applied, weekly_payment }) => (
            <tr key={_id}>
              <td><Moment format="YYYY-MM-DD HH:mm">{date_applied}</Moment></td>
              <td>{full_name}</td>
              <td>{loan_term} months</td>
              <td>
                { loan_amount.toLocaleString('en-US', {maximumFractionDigits:2,minimumFractionDigits:2}) }
              </td>
              <td>
                { loan_balance.toLocaleString('en-US', {maximumFractionDigits:2,minimumFractionDigits:2}) }
              </td>
              <td>
                { weekly_payment.toLocaleString('en-US', {maximumFractionDigits:2,minimumFractionDigits:2}) }
              </td>
              <td>
                <Link to={`/repay/${_id}`} className="btn btn-success btn-sm">
                  Repay
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/" className="btn btn-outline-secondary">Back</Link>
      </Fragment>
    )
  }
}


LoanList.propTypes = {
  getLoans: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, {getLoans})(LoanList)

import React, { Component } from 'react';
import { Row, Col, Button, Card, CardBody, Table,
        Form, FormGroup, Input, InputGroup, InputGroupAddon,
        Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
import { getLoan, getPaymentHistory, payLoan } from '../actions/loanActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

export class RepayLoan extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getLoan(id)
    this.props.getPaymentHistory(id)
  }

  state = {
    modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const pay = {
      _id: this.props.match.params.id,
      amount_paid: this.state.amount_paid
    }

    // Repay loan via payLoan action
    this.props.payLoan(pay)

    // Open  Modal
    this.toggle()
    this.setState({ amount_paid: '' })
  }

  render() {
    const { loan:{loan_balance, weekly_payment}, payments } = this.props.item
    return (
      <div>
        <h1 className="mb-5">Repay Loan</h1>
        <Row>
          <Col>
            <Table striped>
              <thead>
                <tr>
                  <th></th>
                  <th>Amount Paid</th>
                  <th>Balance</th>
                  <th>Date Paid</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(({ _id, amount_paid, remaining_balance, date_paid },index) => (
                  <tr key={_id}>
                    <td>Week {index+1}</td>
                    <td>{ amount_paid.toLocaleString('en-US', {maximumFractionDigits:2,minimumFractionDigits:2}) }</td>
                    <td>{ remaining_balance.toLocaleString('en-US', {maximumFractionDigits:2,minimumFractionDigits:2}) }</td>
                    <td><Moment format="YYYY-MM-DD HH:mm">{date_paid}</Moment></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Link to="/all-loans" className="btn btn-outline-secondary">Back</Link>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <div className="mb-2">Your Loan Balance</div>
                    {
                      loan_balance
                      ? loan_balance.toLocaleString('en-US', {maximumFractionDigits:2,minimumFractionDigits:2})
                      : loan_balance
                    }
                  </FormGroup>
                  <FormGroup>
                    <div className="mb-2">Weekly Payment</div>
                    <h4>$
                      {
                        weekly_payment
                        ? weekly_payment.toLocaleString('en-US', {maximumFractionDigits:2,minimumFractionDigits:2})
                        : weekly_payment
                      }
                    </h4>
                  </FormGroup>
                  <hr className="my-4"/>
                  <FormGroup>
                    <div className="mb-2">Amount to Pay</div>
                    <InputGroup size="lg">
                      <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                      <Input placeholder="Enter Amount" type="number" name="amount_paid" id="amount_paid" onChange={this.onChange}/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mt-4">
                    <Button color="success" size="lg" block>Submit</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Payment Successful</ModalHeader>
          <ModalBody>
            Thank you for your payment!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

RepayLoan.propTypes = {
  getLoan: PropTypes.func.isRequired,
  payLoan: PropTypes.func.isRequired,
  getPaymentHistory: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, {getLoan, payLoan, getPaymentHistory})(RepayLoan)

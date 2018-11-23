import React, { Component } from 'react'
import { Row, Col, Button, Form, FormGroup, Input,
        Modal, ModalHeader, ModalBody, ModalFooter,
        Card ,CardBody, CardTitle, InputGroup, InputGroupAddon } from 'reactstrap'
import { connect } from 'react-redux'
import { addLoan } from '../actions/loanActions'
import { Link } from 'react-router-dom'

export class LoanApplication extends Component {
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

    const newLoan = {
      loan_balance: this.state.loan_amount,
      loan_type: this.state.loan_type,
      loan_amount: this.state.loan_amount,
      loan_term: this.state.loan_term
    }

    // Add loan via addLoan action
    this.props.addLoan(newLoan)

    // Open  Modal
    this.toggle()
  }

  render() {
    const full_name = "John Doe"
    const email = "johndoe@mail.com"
    return (
      <div>
      <h1 className="mb-5">Apply for loan</h1>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }} >
          <Card>
            <CardBody>
             <CardTitle className="mb-5">Loan Form</CardTitle>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <div className="mb-2">Full Name</div>
                  <h3>{full_name}</h3>
                </FormGroup>
                <FormGroup>
                  <div className="mb-2">Email</div>
                  <h4>{email}</h4>
                </FormGroup>
                <hr className="my-4"/>
                <FormGroup>
                  <div className="mb-2">Loan</div>
                  <Input type="select" name="loan_type"
                    id="loan_type" onChange={this.onChange} >
                    <option default>-- Select Loan --</option>
                    <option value="Personal">Personal Loan</option>
                    <option value="Business">Business Loan</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <div className="mb-2">Amount</div>
                  <InputGroup size="lg">
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input type="text" name="loan_amount" id="loan_amount" placeholder="Enter Loan Amount" onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <div className="mb-2">Term</div>
                  <Input type="select" name="loan_term" id="loan_term" onChange={this.onChange}>
                    <option default>-- Select Term --</option>
                    <option value="1">1 month</option>
                    <option value="2">2 months</option>
                    <option value="3">3 months</option>
                    <option value="4">4 months</option>
                    <option value="5">5 months</option>
                  </Input>
                </FormGroup>
                <FormGroup className="mt-5">
                  <Link to="/" size="lg" color="secondary" className="btn btn-outline-secondary btn-lg float-left">Back</Link>
                  <Button size="lg" color="success" className="float-right">Submit</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Application Submitted</ModalHeader>
        <ModalBody>
          Your loan application was successfully submitted and is under review for approval.
        </ModalBody>
        <ModalFooter>
          <Link to={`/all-loans`} className="btn btn-success btn-lg">Done</Link>
        </ModalFooter>
      </Modal>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  loan: state.loan
})

export default connect(mapStateToProps, { addLoan })(LoanApplication)

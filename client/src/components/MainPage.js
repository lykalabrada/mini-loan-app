import React from 'react';
import { Card, CardImg, CardTitle, CardText, Row, Col } from 'reactstrap';
import loan_img from '../loan_img.jpg'
import repay_img from '../repay_img.jpg'
import { Link } from 'react-router-dom'

const MainPage = (props) => {
  return (
    <Row>
      <Col sm="12">
        <div className="text-center">
          <h1>Welcome to Mini-Aspire</h1>
          <p>Aspire is the fastest and simplest way for small businesses to get funding</p>
        </div>
      </Col>
      <Col sm="12" md={{ size: 5, offset: 1 }} >
        <CardImg top width="100%" src={loan_img} alt="Card image cap" />
        <Card body>
          <CardTitle className="h3">Apply for loan</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Link to={`/loan/`} className="btn btn-success btn-lg">
            Apply Now
          </Link>
        </Card>
      </Col>
      <Col sm="12" md="5">
        <CardImg top width="100%" src={repay_img} alt="Card image cap" />
        <Card body>
          <CardTitle className="h3">Repay existing loan</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Link to={`/all-loans/`} className="btn btn-success btn-lg">
            Repay
          </Link>
        </Card>
      </Col>
    </Row>
  )
}

export default MainPage

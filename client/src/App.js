import React, { Component } from 'react'
import AppNavbar from './components/AppNavbar'
import MainPage from './components/MainPage'
import LoanApplication from './components/LoanApplication'
import RepayLoan from './components/RepayLoan'
import LoanList from './components/LoanList'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import { Provider } from 'react-redux'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Container>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/loan/" component={LoanApplication} />
              <Route exact path="/all-loans/" component={LoanList} />
              <Route exact path="/repay/:id" component={RepayLoan} />
            </Container>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;

import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap'
import logo from '../logo.png'

class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const full_name = "John Doe"
    return (
      <div>
        <Navbar expand="sm" className="mb-5" light>
          <Container>
            <NavbarBrand href="/"><img src={logo} alt="Aspire" width="150"/></NavbarBrand>
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar color="secondary">
              <Nav className="ml-auto navbar-light" navbar>
                <NavItem>
                  Hi, {full_name}!
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}



export default AppNavbar

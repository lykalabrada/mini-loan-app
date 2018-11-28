import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Link, MemoryRouter } from 'react-router-dom'
import MainPage from '../MainPage'

describe('MainPage', () => {
  let wrapper

  it('has two main cards', () => {
    wrapper = shallow(<MainPage />)
    expect(
      wrapper.find('Card').length
    ).toBeGreaterThan(1)
    expect(
      wrapper.find(Link).length
    ).toBeGreaterThan(1)
  })
})

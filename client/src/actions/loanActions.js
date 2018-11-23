import axios from 'axios'
import { GET_LOANS, GET_LOAN, ADD_LOAN, PAY_LOAN, GET_PAYMENT_HISTORY, ITEMS_LOADING } from './types'

export const getLoans = () => dispatch => {
  dispatch(setItemsLoading())
  axios.get('/api/loans').then(res =>
      dispatch({
        type: GET_LOANS,
        payload: res.data
      })
    )
}

export const getLoan = id => dispatch => {
  dispatch(setItemsLoading())
  axios.get(`/api/loans/${id}`).then(res =>
      dispatch({
        type: GET_LOAN,
        payload: res.data
      })
    )
}

export const addLoan = loan => dispatch => {
  axios.post('/api/loans', loan).then(res =>
    dispatch({
      type: ADD_LOAN,
      payload: res.data
    })
  )
}

export const payLoan = payment => dispatch => {
  axios.put(`/api/loans/${payment._id}`, payment).then(res =>
    dispatch({
      type: PAY_LOAN,
      payload: res.data
    })
  )
}

export const getPaymentHistory = id => dispatch => {
  dispatch(setItemsLoading())
  axios.get(`/api/loans/history/${id}`).then(res =>
      dispatch({
        type: GET_PAYMENT_HISTORY,
        payload: res.data
      })
    )
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}

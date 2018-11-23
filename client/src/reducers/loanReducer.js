import { GET_LOANS, GET_LOAN, ADD_LOAN, PAY_LOAN, GET_PAYMENT_HISTORY, ITEMS_LOADING } from '../actions/types'

const initialState = {
  loan: {},
  loans: [],
  payments: [],
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOANS:
      return {
        ...state,
        loans: action.payload
      }
    case GET_LOAN:
      return {
        ...state,
        loan: action.payload
      }
    case ADD_LOAN:
      return {
        ...state,
        loans: [action.payload, ...state.loans]
      }
    case PAY_LOAN:
      return {
        ...state,
        loan: action.payload.loan,
        payments: [action.payload.payment, ...state.payments]
      }
    case GET_PAYMENT_HISTORY:
      return {
        ...state,
        payments: action.payload
      }
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

import { handleActions } from "redux-actions";
import {
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS,
  INSERT_CUSTOMER,
  UPDATE_CUSTOMER,
} from "../constants/index";

const customers = handleActions(
  {
    [FETCH_CUSTOMERS]: (state, action) => [...action.payload],
    [INSERT_CUSTOMER]: (state, action) => [...state, action.payload],
    [UPDATE_CUSTOMER]: (state, action) =>
      state.reduce((acc, customer) => {
        if (customer.id === action.payload.id) {
          return [...acc, action.payload];
        }
        return [...acc, customer];
      }, []),
    [DELETE_CUSTOMER]: (state, action) =>
      state.filter((c) => c.id !== action.payload),
  },
  []
);

export default customers;

import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import customers from "./customers";
import {
  CUSTOMER_LIST,
  CUSTOMER_VIEW,
  CUSTOMER_EDIT,
} from "../constants/permissions";

const user = () => ({
  permissions: [CUSTOMER_LIST, CUSTOMER_VIEW, CUSTOMER_EDIT],
});

export default combineReducers({
  customers,
  form: reduxForm,
  user,
});

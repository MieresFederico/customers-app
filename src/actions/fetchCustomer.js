import { createAction } from "redux-actions";
import { FETCH_CUSTOMERS } from "../constants";
import { apiGet } from "../api/index";
import urlCustomers from "../api/urls";

const fetchCustomers = createAction(FETCH_CUSTOMERS, apiGet(urlCustomers));

export default fetchCustomers;

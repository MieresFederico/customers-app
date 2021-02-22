import React from "react";
import PropTypes from "prop-types";
import CustomerListItem from "./CustomerListItem";
import accessControl from "../hoc/accessControl";
import { CUSTOMER_LIST } from "../constants/permissions";

const CustomersList = ({ customers, urlPath }) => (
  <div className="customers-list">
    {customers.map((c) => (
      <CustomerListItem
        key={c.id}
        dni={c.dni}
        name={c.name}
        editAction="Editar"
        delAction="Eliminar"
        urlPath={urlPath}
      />
    ))}
  </div>
);

CustomersList.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  urlPath: PropTypes.string.isRequired,
};

export default accessControl([CUSTOMER_LIST])(CustomersList);

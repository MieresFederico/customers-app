import React from "react";
import PropTypes from "prop-types";
import CustomersActions from "./CustomersActions";
import accessControl from "../hoc/accessControl";
import { CUSTOMER_VIEW } from "../constants/permissions";

const CustomerData = ({
  id,
  name,
  dni,
  age,
  onBack,
  isDeleteAllow,
  onDelete,
}) => (
  <div>
    <div className="customer-data">
      <h2>Datos del cliente</h2>
      <div>
        <strong>Nombre</strong>
        <i>{name}</i>
      </div>
      <div>
        <strong>DNI</strong>
        <i>{dni}</i>
      </div>
      <div>
        <strong>Edad</strong>
        <i>{age}</i>
      </div>
    </div>
    <CustomersActions>
      <button onClick={onBack} type="button">
        Volver
      </button>
      {isDeleteAllow && (
        <button onClick={() => onDelete(id)} type="button">
          Eliminar
        </button>
      )}
    </CustomersActions>
  </div>
);

CustomerData.defaultProps = {
  isDeleteAllow: false,
};

CustomerData.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  dni: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  isDeleteAllow: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
};

export default accessControl([CUSTOMER_VIEW])(CustomerData);

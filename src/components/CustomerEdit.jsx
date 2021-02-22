import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { Prompt } from "react-router-dom";
import setPropsAsInitial from "../hoc/setPropsAsInitial";
import CustomersActions from "./CustomersActions";
import accessControl from "../hoc/accessControl";
import { CUSTOMER_EDIT } from "../constants/permissions";

const MyField = ({ input, meta, type = "text", label, name }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input {...input} type={type} />
    {meta.touched && meta.error && <span>{meta.error}</span>}
  </div>
);

MyField.defaultProps = {
  type: "text",
};

MyField.propTypes = PropTypes.shape({
  input: PropTypes.objectOf(PropTypes.shape({})).isRequired,
  meta: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}).isRequired;

/* const toNumber = (value) => value && Number(value);
const toUpper = (value) => value && value.toUpperCase();
const toLower = (value) => value && value.toLowerCase();
const onlyGrow = (value, previousValue) => {
  if (value) {
    if (!previousValue || value > previousValue) {
      return value;
    }
    return previousValue;
  }
  return false;
}; */

const isNumber = (value) =>
  Number.isNaN(Number(value)) && "El campo debe ser un numero";

const validate = (values) => {
  const error = {};

  if (!values.name) {
    error.name = "El campo nombre es requerido";
  }

  if (!values.dni) {
    error.dni = "El Dni es un campo obligatorio";
  }

  return error;
};

const CustomerEdit = ({
  name,
  dni,
  age,
  handleSubmit,
  submitting,
  onBack,
  pristine,
  submitSucceeded,
}) => (
  <div>
    <h2>Edición del cliente</h2>
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        component={MyField}
        label="Nombre"
        /* parse={toUpper}
        format={toLower} */
      />
      <Field name="dni" component={MyField} label="Dni" validate={isNumber} />
      <Field
        name="age"
        component={MyField}
        type="number"
        validate={isNumber}
        label="Edad"
        /* parse={toNumber}
        normalize={onlyGrow} */
      />
      <CustomersActions>
        <button type="submit" disabled={pristine || submitting}>
          Aceptar
        </button>
        <button type="button" onClick={onBack} disabled={submitting}>
          Cancelar
        </button>
      </CustomersActions>
      <Prompt
        when={!pristine && !submitSucceeded}
        message="Se perderán los datos si continúa"
      />
    </form>

    <h3>
      Nombre: {name} / Dni: {dni} / Edad: {age}
    </h3>
  </div>
);

CustomerEdit.defaultProps = {
  name: null,
  dni: null,
  age: null,
};

CustomerEdit.propTypes = {
  name: PropTypes.string,
  dni: PropTypes.string,
  age: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
};

const CustomerEditForm = reduxForm({ form: "CustomerEdit", validate })(
  CustomerEdit
);

export default accessControl([CUSTOMER_EDIT])(
  setPropsAsInitial(CustomerEditForm)
);

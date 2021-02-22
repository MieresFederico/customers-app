import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router-dom";
import { SubmissionError } from "redux-form";
import AppFrame from "../components/AppFrame";
import { getCustomerByDni } from "../selectors/customers";
import CustomerEdit from "../components/CustomerEdit";
import CustomerData from "../components/CustomerData";
import fetchCustomers_ from "../actions/fetchCustomer";
import updateCustomer_ from "../actions/updateCustomer";
import deleteCustomer_ from "../actions/deleteCustomer";

class CustomerContainer extends Component {
  componentDidMount() {
    const { customer, fetchCustomers } = this.props;
    if (!customer) {
      fetchCustomers();
    }
  }

  handleSubmit = (values) => {
    const { updateCustomer } = this.props;
    const { id, age, dni, name } = values;
    const customer = { age, dni, name };
    return updateCustomer(id, customer).then((r) => {
      if (r.payload && r.payload.error) {
        throw new SubmissionError(r.payload.error);
      }
    });
  };

  handleOnBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleOnSubmitSuccess = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleOnDelete = (id) => {
    const { deleteCustomer, history } = this.props;
    deleteCustomer(id).then(() => {
      history.goBack();
    });
  };

  renderCustomerControl = (isEdit, isDelete) => {
    const { customer } = this.props;
    if (customer) {
      const CustomerControl = isEdit ? CustomerEdit : CustomerData;
      return (
        <CustomerControl
          {...customer}
          onSubmit={this.handleSubmit}
          onSubmitSuccess={this.handleOnSubmitSuccess}
          onBack={this.handleOnBack}
          isDeleteAllow={!!isDelete}
          onDelete={this.handleOnDelete}
        />
      );
    }

    return null;
  };

  renderBody = () => (
    <Route
      path="/customers/:dni/edit"
      children={({ match: isEdit }) => (
        <Route
          path="/customers/:dni/del"
          children={({ match: isDelete }) =>
            this.renderCustomerControl(isEdit, isDelete)
          }
        />
      )}
    />
  );

  render() {
    const { dni } = this.props;
    return (
      <div>
        <AppFrame header={`Cliente ${dni}`} body={this.renderBody()} />
      </div>
    );
  }
}
CustomerContainer.defaultProps = {
  customer: null,
};

CustomerContainer.propTypes = {
  dni: PropTypes.string.isRequired,
  customer: PropTypes.shape({}),
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  fetchCustomers: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  customer: getCustomerByDni(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomers: () => dispatch(fetchCustomers_()),
  updateCustomer: (id, values) => dispatch(updateCustomer_(id, values)),
  deleteCustomer: (id) => dispatch(deleteCustomer_(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerContainer)
);

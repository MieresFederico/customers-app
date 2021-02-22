import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SubmissionError } from "redux-form";
import AppFrame from "../components/AppFrame";
import CustomerEdit from "../components/CustomerEdit";
import insertCustomer_ from "../actions/insertCustomer";

class NewCustomerContainer extends Component {
  handleSubmit = (values) => {
    const { insertCustomer } = this.props;
    const { age, dni, name } = values;
    const customer = { age, dni, name };
    insertCustomer(customer).then((r) => {
      if (r.payload && r.payload.error) {
        throw new SubmissionError(r.payload.error);
      }
    });
  };

  handleOnSubmitSuccess = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleOnBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  renderBody = () => {
    const { customer } = this.props;
    return (
      <CustomerEdit
        {...customer}
        onSubmit={this.handleSubmit}
        onSubmitSuccess={this.handleOnSubmitSuccess}
        onBack={this.handleOnBack}
      />
    );
  };

  render() {
    return (
      <div>
        <AppFrame header="Creación de nuevo cliente" body={this.renderBody()} />
      </div>
    );
  }
}

NewCustomerContainer.defaultProps = {
  customer: null,
};

NewCustomerContainer.propTypes = {
  customer: PropTypes.shape({}),
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  insertCustomer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  insertCustomer: (customer) => dispatch(insertCustomer_(customer)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(NewCustomerContainer)
);

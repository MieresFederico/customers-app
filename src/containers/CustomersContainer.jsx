import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppFrame from "../components/AppFrame";
import CustomersList from "../components/CustomersList";
import CustomersActions from "../components/CustomersActions";
import fetchCustomers_ from "../actions/fetchCustomer";
import { getCustomers } from "../selectors/customers";

class CustomersContainer extends Component {
  componentDidMount() {
    const { customers } = this.props;
    if (customers.length === 0) {
      const { fetchCustomers } = this.props;
      fetchCustomers();
    }
  }

  handleAddNew = () => {
    const { history } = this.props;
    history.push("/customers/new");
  };

  renderBody = (customers) => (
    <div>
      <CustomersList customers={customers} urlPath="customers/" />
      <CustomersActions>
        <button onClick={this.handleAddNew} type="button">
          Nuevo Cliente
        </button>
      </CustomersActions>
    </div>
  );

  render() {
    const { customers } = this.props;
    return (
      <div>
        <AppFrame
          header="Listado de clientes"
          body={this.renderBody(customers)}
        />
      </div>
    );
  }
}

CustomersContainer.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchCustomers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  customers: getCustomers(state),
});

export default withRouter(
  connect(mapStateToProps, { fetchCustomers: fetchCustomers_ })(
    CustomersContainer
  )
);

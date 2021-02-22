import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AppFrame from "../components/AppFrame";
import CustomersActions from "../components/CustomersActions";

class HomeContainer extends Component {
  handleOnClick = () => {
    const { history } = this.props;
    history.push("/customers");
  };

  render() {
    return (
      <div>
        <AppFrame
          header="Inicio"
          body={
            <div>
              Esta es la pantalla inicial
              <CustomersActions>
                <button onClick={this.handleOnClick} type="button">
                  Listado de clientes
                </button>
              </CustomersActions>
            </div>
          }
        />
      </div>
    );
  }
}

HomeContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(HomeContainer);

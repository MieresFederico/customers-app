import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const accessControl = (permissionsRequired) => (WrappedComponent) => {
  const SecuredControl = class extends PureComponent {
    render() {
      const { user } = this.props;
      const { permissions } = user;

      const isAllow = permissionsRequired.every(
        (p) => permissions.indexOf(p) >= 0
      );
      if (!isAllow) {
        return (
          <div>
            <i>No tiene permisos de acceso</i>
          </div>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  };

  SecuredControl.propTypes = {
    user: PropTypes.shape({
      permissions: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  };

  return connect((state) => ({ user: state.user }))(SecuredControl);
};

export default accessControl;

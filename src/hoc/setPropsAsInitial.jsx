import React, { PureComponent } from "react";

const setPropsAsInitial = (WrappedComponent) =>
  class extends PureComponent {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          initialValues={this.props}
          enableReinitialize
        />
      );
    }
  };

export default setPropsAsInitial;

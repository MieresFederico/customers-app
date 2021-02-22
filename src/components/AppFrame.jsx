import React from "react";
import PropTypes from "prop-types";
import AppHeader from "./AppHeader";

const AppFrame = ({ header, body, footer }) => (
  <div>
    <div className="app-frame">
      <AppHeader title={header} />
      <div>{body}</div>
      <div>{footer}</div>
    </div>
  </div>
);

AppFrame.defaultProps = {
  footer: null,
};

AppFrame.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired,
  footer: PropTypes.element,
};

export default AppFrame;

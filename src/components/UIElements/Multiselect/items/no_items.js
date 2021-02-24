import React from "react";
import PropTypes from "prop-types";

import styles from "./no_items.module.scss";

const NoItems = ({ noItemsMessage }) => (
  <div className={styles.no_items}>{noItemsMessage}</div>
);

NoItems.propTypes = {
  noItemsMessage: PropTypes.string
};

NoItems.defaultProps = {
  noItemsMessage: "No Items..."
};

export default NoItems;

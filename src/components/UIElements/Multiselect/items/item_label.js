import React from "react";
import PropTypes from "prop-types";
import ReactOverflowTooltip from "react-overflow-tooltip";

import styles from "./item_label.module.scss";

const ItemLabel = ({ label }) => (
  <ReactOverflowTooltip title={label}>
    <div className={styles.label}>{label}</div>
  </ReactOverflowTooltip>
);

ItemLabel.propTypes = {
  label: PropTypes.string
};

ItemLabel.defaultProps = {
  label: ""
};

export default ItemLabel;

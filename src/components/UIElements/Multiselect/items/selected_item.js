import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "react-icons/lib/md/close";
import ArrowUpwardIcon from "react-icons/lib/md/arrow-upward";
import ArrowDownwardIcon from "react-icons/lib/md/arrow-downward";
import IconButton from "@material-ui/core/IconButton";
import ItemLabel from "./item_label";
import classnames from "classnames";
import styles from "./selected_item.module.scss";
import { connect } from 'react-redux';
import { updateQueryBuilder } from 'redux/uiElements';

//const SelectedItem = ({ item, height, group, disabled }) => {
const SelectedItem = (props) => {
  const { item, height, group, disabled } = props;

  const resortDown = (item) => {
    var newArr = [...props.queryBuilder.queryColumns];
    var itemIndex = props.queryBuilder.queryColumns.findIndex((column) => {
      return column.id === item.id
    });
    var len = props.queryBuilder.queryColumns.length;
    if (itemIndex === len-1) {
      let prev = newArr[len-1];
      for (let i = len - 1; i > 0; i--) {
        newArr[i] = newArr[i - 1];
      }
      newArr[0] = prev;
    } else {
      let prev = newArr[itemIndex + 1];
      newArr[itemIndex + 1] = newArr[itemIndex];
      newArr[itemIndex] = prev;
    }
    props.updateQueryBuilder({
      queryColumns: newArr
    })
  }

  const resortUp = (item) => {
    var newArr = [...props.queryBuilder.queryColumns];
    var itemIndex = props.queryBuilder.queryColumns.findIndex((column) => {
      return column.id === item.id
    });
    var len = props.queryBuilder.queryColumns.length;
    if (itemIndex === 0) {
      let prev = newArr[0];
      for (let i = 0; i < len - 1; i++) {
        newArr[i] = newArr[i + 1];
      }
      newArr[len - 1] = prev;
    } else {
      let prev = newArr[itemIndex - 1];
      newArr[itemIndex - 1] = newArr[itemIndex];
      newArr[itemIndex] = prev;
    }
    props.updateQueryBuilder({
      queryColumns: newArr
    })
  }

  return <div className={styles.grid}>
    <div
      className={classnames({
        [styles.with_grouping]: group,
        [styles.selected_item]: !group,
        [styles.disabled]: disabled
      })}
      style={{ height }}
    >
      <ItemLabel label={item.label} />
      {!group && !disabled && (
        <IconButton>
          <CloseIcon />
        </IconButton>
      )}
    </div>
    <div className={styles.arrow}>
      <IconButton onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        resortDown(item);
      }}>
        <ArrowDownwardIcon />
      </IconButton>
      <IconButton onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        resortUp(item);
      }}>
        <ArrowUpwardIcon />
      </IconButton>
    </div>
  </div>
}

SelectedItem.propTypes = {
  item: PropTypes.object,
  height: PropTypes.number,
  isLocked: PropTypes.func
};

SelectedItem.defaultProps = {
  item: {},
  height: 40
};


let mapStateToProps = (state) => {
  return {
    queryBuilder: state.uiElements.queryBuilder
  }
}

export default connect(mapStateToProps, { updateQueryBuilder })(SelectedItem);

//export default SelectedItem;

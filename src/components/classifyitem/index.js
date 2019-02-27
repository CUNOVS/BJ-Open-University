import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'components';
import styles from './index.less';

const PrefixCls = 'classifyitem';

const ClassifyItem = (props) => {
  const onChange = ({ value, label }) => {
    props.dispatch({
      type: 'curriculum/updateState',
      payload: {
        currentClassify: label,
        currentValue: value,
        open: false,
      },
    });
  };
  return (
    <div className={styles[`${PrefixCls}-container`]}>
      {props.data.map((data, i) => {
        return (
          <div className={styles[`${PrefixCls}-container-item`]}>
            <Tag selected={props.currentValue === data.value} onChange={onChange.bind(null, data)}>{data.label}</Tag>
          </div>
        );
      })}
    </div>
  );
};
ClassifyItem.defaultProps = {
  data: [],
};
ClassifyItem.PropTypes = {};
export default ClassifyItem;

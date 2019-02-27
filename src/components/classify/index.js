import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'classifyitem';

function ClassifyItem (props) {
  return (
    <div className={styles[`${PrefixCls}-box`]}>{props.items}</div>
  );
}

ClassifyItem.propTypes = {

};

ClassifyItem.defaultProps = {
  item: '6666',
};
export default ClassifyItem;

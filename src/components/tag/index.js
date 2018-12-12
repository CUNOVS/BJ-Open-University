import React from 'react';
import { List } from 'antd-mobile';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'tag';

function Tag (props) {
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      {props.title}
    </div>
  );
}

Tag.propTypes = {
  title: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  title: '',

};
export default Tag;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';


const PrefixCls = 'status';

const Status = (props) => (
  <div className={styles[`${PrefixCls}-outer`]}>
    {props.status ?
      <div className={styles[`${PrefixCls}-outer-qualified`]}>
        {props.content}
      </div>
      :
      <div className={styles[`${PrefixCls}-outer-unqualified`]}>
        {props.content}
      </div>
    }
  </div>
);
Status.PropTypes = {
  bg: PropTypes.string.isRequired,
  tutor: PropTypes.string.isRequired,
  master: PropTypes.string.isRequired,
};

Status.defaultProps = {
  content: '达标',
  status: '0',
};
export default Status;

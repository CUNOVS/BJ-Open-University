import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import styles from './index.less';

const icon = {
  complete: '/components/wancheng.svg'
};

const StatusBox = (props) => (
  <div className={styles.outer} >
    <Icon type={getLocalIcon(icon[props.status])} size='lg' color="#1eb259" />
    <span >{props.content}</span >
  </div >
);
StatusBox.PropTypes = {
  status: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,

};

StatusBox.defaultProps = {
  status: 'complete ',
  content: '您已经完成此活动'
};
export default StatusBox;

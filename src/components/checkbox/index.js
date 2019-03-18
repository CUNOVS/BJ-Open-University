/**
 * @author Lowkey
 * @date 2019/03/12 15:46:01
 * @Description:
 */

import React from 'react';
import { Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils';
import PropTypes from 'prop-types';
import styles from './index.less';
import Card from '../card';

const Checkbox = (props) => {
  const { state, tracking } = props;
  if (tracking === 2) {
    return (
      <div className={styles.outer} onClick={props.handlerClick}>
        <label className={styles.label}>
          <input type="checkbox" name="name" checked={props.checked} />
          <span className={styles.icon}>
          <Icon type={getLocalIcon('/checkbox/completion-auto-n.svg')} color="#22609c" />
        </span>
          <span className={styles.iconchecked}>
          <Icon type={getLocalIcon('/checkbox/completion-auto-y.svg')} color="#22609c" />
        </span>
        </label>
      </div>
    );
  } else if (tracking === 1) {
    return (
      <div className={styles.outer} onClick={props.handlerClick}>
        <label className={styles.label}>
          <span className={styles.icon}>
          <Icon type={getLocalIcon('/checkbox/completion-manual-n.svg')} color="#22609c" />
        </span>
        </label>
      </div>
    );
  }
};
Checkbox.defaultProps = {
  checked: false,

};
Checkbox.propTypes = {
  handlerClick: PropTypes.func.isRequired,
};
export default Checkbox;

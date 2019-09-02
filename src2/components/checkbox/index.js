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

const getIcon = (state) => {
  const newState = parseInt(state, 10);
  if (newState === 1) {
    return <Icon type={getLocalIcon('/checkbox/completion-auto-pass.svg')} />;
  } else if (newState === 2) {
    return <Icon type={getLocalIcon('/checkbox/completion-auto-pass.svg')} />;
  } else if (newState === 3) {
    return <Icon type={getLocalIcon('/checkbox/completion-auto-fail.svg')} />;
  } else {
    return <Icon type={getLocalIcon('/checkbox/completion-manual-n.svg')} />;
  }
};

const Checkbox = (props) => {
  const { state, tracking = '1' } = props;
  if (tracking === '2') {
    return (
      <div className={styles.outer} onClick={props.handlerClick} >
        {getIcon(state)}
      </div >
    );
  } else if (tracking === '1') {
    return (
      <div className={styles.outer} onClick={props.handlerClick} >
        {getIcon(state)}
      </div >
    );
  }
};
Checkbox.defaultProps = {};
Checkbox.propTypes = {
  handlerClick: PropTypes.func.isRequired,
};
export default Checkbox;

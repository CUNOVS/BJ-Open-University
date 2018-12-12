import React from 'react';
import styles from './index.less';
import { Badge, Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils';
import PropTypes from 'prop-types';
import ClassifyItem from '../classify';

const PrefixCls = 'notice';

const Notice = (props) => {
  return (
    <div className={styles[`${PrefixCls}-tongzhi`]} onClick={props.handlerClick}>
      <div className={styles[`${PrefixCls}-tongzhi-div1`]}>
        <img src={require('./bg.png')} style={{ width: '70%', marginLeft: '0.1rem' }} />
      </div>
      <div className={styles[`${PrefixCls}-tongzhi-div2`]}>
        <p className={styles[`${PrefixCls}-tongzhi-div2-p1`]}>通知<Badge style={{ marginLeft: '5px' }} text={2}
                                                                       overflowCount={55} /></p>
        <p className={styles[`${PrefixCls}-tongzhi-div2-p2`]} style={{ margin: '5px 0 0 0' }}>{123}</p>
      </div>
      <div style={{ flex: '10%' }}>
        <Icon type="right" />
      </div>
    </div>

  );
};

Notice.propTypes = {};

Notice.defaultProps = {
  item: '6666',
};
export default Notice;

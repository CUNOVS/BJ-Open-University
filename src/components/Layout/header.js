import React from 'react';
import styles from './header.less';
import { Icon, Badge } from 'antd-mobile';
import { getLocalIcon } from 'utils';


const PrefixCls = 'header';


class Header extends React.Component {
  state = {};

  render () {
    return (
      <div className={styles[`${PrefixCls}-logo-outer`]}>
        <div className={styles['logo-box']}>
          <img src={require('themes/images/logo.png')} alt="" />
          <p>北京开放大学</p>
        </div>
        <div className={styles[`${PrefixCls}-logo-outer-messagebox`]}>
          <Badge dot>
            <Icon type={getLocalIcon('/dashboard/message.svg')} color="#fff" />
          </Badge>
        </div>
      </div>
    );
  }
}

export default Header;


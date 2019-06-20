import React from 'react';
import styles from './header.less';
import PropTypes from 'prop-types';
import { Icon, Badge } from 'antd-mobile';
import { getLocalIcon } from 'utils';


const PrefixCls = 'header';


class Header extends React.Component {
  state = {};

  qrCodeClick = () => {
    if (cnIsDevice()) {
      cnDoScan();
    }
  };

  render () {
    return (
      <div className={styles[`${PrefixCls}-logo-outer`]} >
        <div onClick={this.qrCodeClick} >
          <Icon type={getLocalIcon('/dashboard/QRcode.svg')} color="#fff" />
        </div >
        <div className={styles['logo-box']} >
          <img src={require('themes/images/logo.png')} alt="" />
        </div >
        <div className={styles[`${PrefixCls}-logo-outer-messagebox`]} onClick={this.props.handlerClick} >
          <Badge text={`${this.props.count > 0 ? this.props.count : ''}`} >
            <Icon type={getLocalIcon('/dashboard/message.svg')} color="#fff" />
          </Badge >
        </div >
      </div >
    );
  }
}

Header.defaultProps = {};
Header.propTypes = {
  handlerClick: PropTypes.func.isRequired,
};
export default Header;


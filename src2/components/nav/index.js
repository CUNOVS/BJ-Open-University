import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import classNames from 'classnames';
import { getTitle } from 'utils';
import styles from './index.less';

const PrefixCls = 'nav';

function Nav (props) {
  const goBack = (backNum) => {
    if (props.isAlert) {
      props.dispatch({
        type: 'app/updateBackModal',
        payload: {
          showBackModal: true
        }
      });
    } else {
      props.dispatch(routerRedux.go(backNum));
      if (typeof props.navEvent === 'function') {
        props.navEvent();
      }
    }
  };
  return (
    <div >
      <div className={classNames(styles[`${PrefixCls}-header-box`], { [styles.shadow]: props.hasShadow })} >
        <div className={styles[`${PrefixCls}-header`]} >
          <NavBar
            leftContent=""
            onLeftClick={props.isGoBack ? () => goBack(props.backNum) : null}
            mode="light"
            icon={props.isGoBack ? <Icon type="left" color="#fff" /> : null}
            rightContent={props.renderNavRight}
          >{getTitle(props.title)}</NavBar >
        </div >
      </div >
    </div >
  );
}

Nav.propTypes = {};
Nav.defaultProps = {
  dispatch: null,
  confirm: null,
  renderNavRight: null,
  title: '',
  navEvent: null,
  backNum: -1,
  hasShadow: false,
  isGoBack: true,
  isAlert: false,
  alertTitle: '确定要离开吗？'
};

export default Nav;

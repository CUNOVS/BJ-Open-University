import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import classNames from 'classnames';
import styles from './index.less';

const PrefixCls = 'nav';

function Nav (props) {
  const goBack = () => {
    props.dispatch(routerRedux.goBack());
    if (typeof props.navEvent === 'function') {
      props.navEvent();
    }
  };
  return (
    <div>
      <div className={classNames(styles[`${PrefixCls}-header-box`], { [styles.shadow]: props.hasShadow })}>
        <div className={styles[`${PrefixCls}-header`]}>
          <NavBar
            leftContent=""
            onLeftClick={props.isGoBack ? goBack : null}
            mode="light"
            icon={props.isGoBack ? <Icon type="left" color='#fff' /> : null}
            rightContent={props.renderNavRight}
          >{props.title}</NavBar>
        </div>
      </div>
    </div>
  );
}

Nav.propTypes = {

};
Nav.defaultProps = {
  dispatch: null,
  renderNavRight: null,
  title: '',
  navEvent: null,
  hasShadow: false,
  isGoBack: true,
};

export default Nav;

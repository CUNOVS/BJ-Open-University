/**
 * @author Lowkey
 * @date 2018/10/18
 * @Description:
 */
import React from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { classnames, config, getLocalIcon } from 'utils';
import { defaultTabBarIcon, defaultTabBars } from 'utils/defaults';
import { Loader, TabBar, Icon, Modal } from 'components';
import './app.less';

let lastHref,
  isFirst = true,
  progessStart = false;
const appendIcon = (tar, i) => {
  let { icon = '', selectedIcon = '', route = '/default' } = tar;
  tar.key = ++i;
  if (icon === '' || selectedIcon === '') {
    route = route.substr(1);
    tar = { ...tar, ...(defaultTabBarIcon[route || 'default'] || {}) };
  }
  return tar;
};
let tabBars = defaultTabBars;
tabBars = tabBars.map((bar, i) => appendIcon(bar, i));

const App = ({ children, dispatch, app, loading, location }) => {
  let { pathname } = location;
  const { updates: { upgraded = false, urls = '', appVerSion, updateInfo }, showModal } = app;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  pathname = pathname.endsWith('/index.html') ? '/' : pathname; // Android配置首页自启动
  const href = window.location.href,
    menusArray = [];
  tabBars.map((_) => {
    menusArray.push(_.route);
  });

  cnSetStatusBarStyle(pathname);
  if (lastHref !== href || loading.global) {
    NProgress.start();
    progessStart = true;
    if (!loading.global) {
      lastHref = href;
    }
  }
  if (!loading.global && progessStart) {
    progessStart = false;
    NProgress.done();
  }
  const update = (url) => {
    if (upgraded && url !== '') {
      return (<Modal
        visible
        transparent
        maskClosable={false}
        title={appVerSion || cnVersionInfo.title}
        footer={[{ text: '立刻升级', onPress: () => cnUpdate(url) }]}
      >
        <div >
          {updateInfo || cnVersionInfo.content}
        </div >
      </Modal >);
    }
    if (isFirst && url !== '') {
      Modal.alert(appVerSion || cnVersionInfo.title, updateInfo || cnVersionInfo.content, [
        {
          text: '暂不升级',
          onPress: () => dispatch({
            type: 'app/updateState',
            payload: {
              showModal: false,
            },
          }),
          style: 'default',
        },
        { text: '立刻升级', onPress: () => cnUpdate(url) },
      ]);
      isFirst = false;
    }
  };
  if (pathname !== '/' && menusArray.length && !menusArray.includes(pathname)) {
    return (<div >
      <Loader spinning={loading.effects[`${pathname.startsWith('/') ? pathname.substr(1) : pathname}/query`]} />
      {children}
    </div >);
  }

  return (
    <div className="tabbarbox" >
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#3f7eba"
        barTintColor="white"
        hidden={false}
      >
        {tabBars.map((_, index) => {
          const props = Object.assign({
            key: index,
            selectedIcon: _.icon,
            selected: pathname === _.route,
            onPress: () => {
              const { appends = {}, route, key } = _;
              dispatch(routerRedux.push({
                  pathname: route,
                  query: {
                    ...appends,
                  },
                },
              ));
            },
          }, _);
          props.icon = (<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: `url(${props.icon}) center center /  0.42rem 0.42rem no-repeat`,
          }}
          />);

          props.selectedIcon = (<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: `url(${props.selectedIcon}) center center /  0.42rem 0.42rem no-repeat`,
          }}
          />);
          return (
            <TabBar.Item {...props}>
              {pathname === _.route ? children : ''}
            </TabBar.Item >
          );
        })}
      </TabBar >
      {showModal && update(urls)}
    </div >
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
  icon: PropTypes.string,
};

export default connect(({ app, loading }) => ({ app, loading }))(App);

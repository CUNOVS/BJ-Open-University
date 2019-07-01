/* eslint-disable indent */
import React from 'react';
import { connect } from 'dva';
import { Button, Flex, WingBlank, WhiteSpace, List, Icon, Modal, Badge, Layout, Toast } from 'components';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import CarouselGrid from 'components/carouselgrid';
import { handlerChangeRouteClick, handleGridClick } from 'utils/commonevents';
import { routerRedux } from 'dva/router';
import { baseURL, api } from 'utils/config';
import styles from './index.less';

const PrefixCls = 'mine';

function Mine ({ location, dispatch, mine, app }) {
  const { users: { username, useravatar }, isLogin, updates: { urls = '', appVerSion = '', updateInfo = '' } } = app,
    { gridDatas } = mine;
  const handleLogin = () => {
      dispatch(routerRedux.push({
        pathname: '/login',
      }));
    },
    handleUpdateClick = (urls, appVerSion, updateInfo) => {
      if (cnIsAndroid()) {
        if (urls !== '') {
          Modal.alert(`版本更新(${appVerSion})`, this.getContent(updateInfo), [
            {
              text: '暂不升级',
              onPress: () => this.props.dispatch({
                type: 'app/updateState',
                payload: {
                  showModal: false,
                },
              }),
              style: 'default',
            },
            { text: '立刻升级', onPress: () => cnUpdate(urls) },
          ]);
        } else {
          Toast.offline('已经是最新版本啦(#^.^#)');
        }
      }
    };
  return (
    <div >
      <div className={styles[`${PrefixCls}-top`]} >
        <div className={styles[`${PrefixCls}-top-content`]} >
          <img src={getImages(useravatar, 'user')} alt="" onError={(el => getErrorImg(el, 'user'))} />
          <div className={styles[`${PrefixCls}-top-content-info`]} >
            <div className={styles[`${PrefixCls}-top-content-info-username`]} onClick={isLogin ? null : handleLogin} >
              {isLogin ? username : '登录'}
            </div >
            <Button
              onClick={handlerChangeRouteClick.bind(null, 'medalList', { name: '勋章' }, dispatch)}
              type="ghost"
              inline
              size="small"
              style={{ color: '#fff', borderColor: '#ff9a1b', padding: '0 6px' }}
              icon={<Icon type={getLocalIcon('/mine/chapters.svg')} color="#ff9a1b" size="xs" />
              }
            >勋章</Button >
          </div >
        </div >
        <div className={styles[`${PrefixCls}-top-homepage`]} >
          <Button
            onClick={handlerChangeRouteClick.bind(this, 'homepage', {}, dispatch)}
            type="ghost"
            inline
            size="small"
            style={{ color: '#fff', borderColor: '#fff', padding: '0 10px' }}
            icon={<Icon type={getLocalIcon('/mine/homepage.svg')} color="#fff" size="xs" />
            }
          >个人主页</Button >
        </div >
      </div >
      <WhiteSpace />
      <CarouselGrid
        datas={gridDatas}
        dispatch={dispatch}
        hasLine={false}
        handleClick={handleGridClick}
        isCarousel={false}
      />
      <WhiteSpace size="xs" />
      <div className={styles[`${PrefixCls}-info`]} >
        <List >
          <List.Item
            thumb={<Icon type={getLocalIcon('/mine/contacts.svg')} />}
            onClick={handlerChangeRouteClick.bind(this, 'contacts', { name: '我的联系人' }, dispatch)}
            arrow="horizontal"
          >
            我的联系人
          </List.Item >
          <List.Item
            thumb={<Icon type={getLocalIcon('/mine/opinion.svg')} />}
            onClick={handlerChangeRouteClick.bind(this, 'opinion', { name: '意见反馈' }, dispatch)}
            arrow="horizontal"
          >
            意见反馈
          </List.Item >
          <List.Item
            thumb={<Icon type={getLocalIcon('/mine/help.svg')} />}
            arrow="horizontal"
          >
            使用帮助
          </List.Item >
          <List.Item
            thumb={<Icon type={getLocalIcon('/mine/help.svg')} />}
            extra={appVerSion}
            onClick={handleUpdateClick.bind(null, urls, appVerSion, updateInfo)}
          >
            {urls !== '' ? <Badge dot >
              版本信息
            </Badge > : '版本信息'}
          </List.Item >
        </List >
      </div >
    </div >
  );
}

export default connect(({ mine, app, login }) => ({
  mine,
  app,
  login,
}))(Mine);

/* eslint-disable indent */
import React from 'react';
import { connect } from 'dva';
import { Button, Flex, WingBlank, WhiteSpace, List, Icon, Modal, Badge, Layout } from 'components';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import CarouselGrid from 'components/carouselgrid';
import { handleGridClick } from 'utils/commonevents';
import { routerRedux } from 'dva/router';
import { baseURL, api } from 'utils/config';
import styles from './index.less';

const PrefixCls = 'mine',
  { helpApi } = api,
  Item = List.Item;

function Mine ({ location, dispatch, mine, app, login }) {
  const name = '我的';
  const { users: { username, useravatar }, isLogin } = app,
    { gridDatas } = mine;
  const handleLogin = () => {
      if (!isLogin) {
        dispatch(routerRedux.push({
          pathname: '/login',
        }));
      }
    },
    handleLoginout = () => {
      dispatch({
        type: 'app/logout',
      });
    },

    handleopinionClick = ({ name = '意见反馈' }) => {
      dispatch(routerRedux.push({
        pathname: 'opinion',
        query: {
          name,
        },
      }));
    },

    handlerHomePageClick = () => {
      dispatch(routerRedux.push({
        pathname: '/homepage',
      }));
    },
    showAlert = () => {
      Modal.alert('退出', '离开我的阿拉善', [
        {
          text: '残忍退出',
          onPress: handleLoginout,
        },
        { text: '再看看', onPress: () => console.log('cancel') },

      ]);
    };
  return (
    <div>
      <div className={styles[`${PrefixCls}-top`]} onClick={handleLogin}>
        <div className={styles[`${PrefixCls}-top-content`]}>
          <img src={getImages(useravatar, 'user')} alt="" />
          <div className={styles[`${PrefixCls}-top-content-info`]}>
            <div className={styles[`${PrefixCls}-top-content-info-username`]}>登录/注册</div>
            <div className={styles[`${PrefixCls}-top-content-info-chapters`]}>
              <div><Icon type={getLocalIcon('/mine/chapters.svg')} color="#ff9a1b" size="xs" /></div>
              <div>勋章</div>
            </div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-top-homepage`]}>
          <div><Icon type={getLocalIcon('/mine/homepage.svg')} color="#fff" size="xs" /></div>
          <div onClick={handlerHomePageClick}>个人主页</div>
        </div>
      </div>
      <CarouselGrid
        datas={gridDatas}
        dispatch={dispatch}
        hasLine={false}
        isCarousel={false}
        handleClick={handleGridClick} />
      <WhiteSpace size="xs" />
      <div className={styles[`${PrefixCls}-info`]}>
        <List>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/contacts.svg')} />}
            onClick={handleopinionClick}
            arrow="horizontal"
          >
            我的联系人
          </Item>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/opinion.svg')} />}
            onClick={handleopinionClick}
            arrow="horizontal"
          >
            意见反馈
          </Item>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/help.svg')} />}
            arrow="horizontal"
          >
            使用帮助
          </Item>

        </List>
      </div>
    </div>
  );
}

export default connect(({ mine, app, login }) => ({
  mine,
  app,
  login,
}))(Mine);

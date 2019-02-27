/* eslint-disable indent */
import React from 'react';
import { connect } from 'dva';
import { Button, Flex, WingBlank, WhiteSpace, List, Icon, Modal, Badge, Layout } from 'components';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import CarouselGrid from 'components/carouselgrid';
import { handlerChangeRouteClick, handleGridClick } from 'utils/commonevents';
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
      dispatch(routerRedux.push({
        pathname: '/login',
      }));

  };
  return (
    <div>
      <div className={styles[`${PrefixCls}-top`]}>
        <div className={styles[`${PrefixCls}-top-content`]}>
          <img src={getImages(useravatar, 'user')} alt="" />
          <div className={styles[`${PrefixCls}-top-content-info`]}>
            <div className={styles[`${PrefixCls}-top-content-info-username`]} onClick={handleLogin}>登录/注册</div>
            <div className={styles[`${PrefixCls}-top-content-info-chapters`]}
                 onClick={handlerChangeRouteClick.bind(null, 'medalList', { name: '勋章' }, dispatch)}>
              <div><Icon type={getLocalIcon('/mine/chapters.svg')} color="#ff9a1b" size="xs" /></div>
              <div>勋章</div>
            </div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-top-homepage`]}>
          <div><Icon type={getLocalIcon('/mine/homepage.svg')} color="#fff" size="xs" /></div>
          <div onClick={handlerChangeRouteClick.bind(this, 'homepage', {}, dispatch)}>个人主页</div>
        </div>
      </div>
      <CarouselGrid
        datas={gridDatas}
        dispatch={dispatch}
        hasLine={false}
        handleClick={handleGridClick}
        isCarousel={false} />
      <WhiteSpace size="xs" />
      <div className={styles[`${PrefixCls}-info`]}>
        <List>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/contacts.svg')} />}
            onClick={handlerChangeRouteClick.bind(this, 'contacts', { name: '我的联系人' }, dispatch)}
            arrow="horizontal"
          >
            我的联系人
          </Item>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/opinion.svg')} />}
            onClick={handlerChangeRouteClick.bind(this, 'opinion', { name: '意见反馈' }, dispatch)}
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

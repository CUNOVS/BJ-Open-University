/* eslint-disable indent */
import React from 'react';
import { connect } from 'dva';
import { Button, Flex, WingBlank, WhiteSpace, List, Icon, Modal, Badge, Layout } from 'components';
import { getImages, getErrorImg, getLocalIcon, getDefaultBg } from 'utils';
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
  const { users: { username, useravatar }, isLogin, noViewCount = 0 } = app,
    { gridDatas } = mine;
  const handleLogin = () => {
    console.log(isLogin)
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
    handleHelpClick = ({ name = '帮助' }) => {
      dispatch(routerRedux.push({
        pathname: 'iframe',
        query: {
          name,
          externalUrl: baseURL + helpApi,
        },
      }));
    },
    handleopinionClick = ({ name = '意见反馈' }) => {
      dispatch(routerRedux.push({
        pathname: 'opinion',
        query: {
          name,
        },
      }));
    },

    handleSetupClick = ({ name = '个人设置' }) => {
      dispatch(routerRedux.push({
        pathname: '/setup',
        query: {
          name,
        },
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
    },
    handleAboutUsClick = ({ name = '关于我们' }) => {
      dispatch(routerRedux.push({
        pathname: '/aboutus',
        query: {
          name,
        },
      }));
    };
  return (
    <div>
      <div className={styles[`${PrefixCls}-top`]} onClick={handleLogin}>
        <div className={styles[`${PrefixCls}-top-bg`]} style={{ backgroundImage: `url(${getDefaultBg('')})` }}>

        </div>
        <div className={styles[`${PrefixCls}-top-content`]}>
          <img src={getImages(useravatar, 'user')} alt="" />
          <div className={styles[`${PrefixCls}-top-content-username`]}>登录/注册</div>
        </div>
      </div>
      <CarouselGrid datas={gridDatas} dispatch={dispatch} hasLine={false} isCarousel={false}
                    handleClick={handleGridClick} />
      <WhiteSpace size="xs" />
      <div className={styles[`${PrefixCls}-info`]}>
        <List>
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
          <Item
            thumb={<Icon type={getLocalIcon('/mine/aboutus.svg')} />}
            arrow="horizontal"
            onClick={handleAboutUsClick}
          >
            关于我们
          </Item>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/setup.svg')} />}
            arrow="horizontal"
            onClick={handleSetupClick}
          >
            个人设置
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

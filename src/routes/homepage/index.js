/* eslint-disable indent */
import React from 'react';
import { connect } from 'dva';
import { Icon } from 'components';
import { getImages, getErrorImg, getLocalIcon, getDefaultBg } from 'utils';
import Photoheader from 'components/photoheader';
import { routerRedux } from 'dva/router';
import { List } from 'components';
import styles from './index.less';

const PrefixCls = 'homepage',
  Item = List.Item,
  Brief = Item.Brief;

function HomePage ({ location, dispatch, homepage, app }) {
  const { users: { username, useravatar } } = app;
  return (
    <div>
      <div className={styles[`${PrefixCls}-top`]}>
        <Photoheader dispatch={dispatch} />
        <div className={styles[`${PrefixCls}-top-bg`]} style={{ backgroundImage: `url(${getDefaultBg(useravatar)})` }}>
        </div>
        <div className={styles[`${PrefixCls}-top-avatar`]}>
          <img src={getImages(useravatar, 'user')} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-info`]}>
          <div className={styles[`${PrefixCls}-info-username`]}>深绘里</div>
          <div className={styles[`${PrefixCls}-info-signature`]}>东张西望，一无所长</div>
          <div className={styles[`${PrefixCls}-info-button`]}>
            编辑个人信息
          </div>
        </div>
      </div>
      <List className="my-list">
        <Item extra={'a9527'}>学号</Item>
      </List>
    </div>
  );
}

export default connect(({ homepage, app, login }) => ({
  homepage,
  app,
  login,
}))(HomePage);

/* eslint-disable indent */
import React from 'react';
import { connect } from 'dva';
import { Icon } from 'components';
import { getImages, getErrorImg, getLocalIcon, getDefaultBg } from 'utils';
import Photoheader from 'components/photoheader';
import { routerRedux } from 'dva/router';
import { handlerChangeRouteClick } from 'utils/commonevents';
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
        <div style={{ overflow: 'hidden' }}>
          <div className={styles[`${PrefixCls}-top-bg`]}
               style={{ backgroundImage: `url(${getDefaultBg(useravatar)})` }}>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-top-avatar`]}>
          <img src={getImages(useravatar, 'user')} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-info`]}>
          <div className={styles[`${PrefixCls}-info-username`]}>深绘里</div>
          <div className={styles[`${PrefixCls}-info-signature`]}>东张西望，一无所长</div>
          <div className={styles[`${PrefixCls}-info-button`]}
               onClick={handlerChangeRouteClick.bind(this, 'setup', { name: '编辑' }, dispatch)}>
            编辑个人信息
          </div>
        </div>
      </div>
      <div className={styles[`${PrefixCls}-list`]}>
        <List className="my-list">
          <Item thumb={<Icon type={getLocalIcon('/sprite/studentID.svg')} />} extra={'a9527'}>学号</Item>
          <Item thumb={<Icon type={getLocalIcon('/sprite/email.svg')} />} extra={'example@outlook.com'}>Email</Item>
          <Item thumb={<Icon type={getLocalIcon('/sprite/school.svg')} />} extra={'北京开放大学'}>所属分校</Item>
        </List>
      </div>
    </div>
  );
}

export default connect(({ homepage, app, login }) => ({
  homepage,
  app,
  login,
}))(HomePage);

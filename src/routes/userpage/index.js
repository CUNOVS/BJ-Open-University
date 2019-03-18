/* eslint-disable indent */
import React from 'react';
import { connect } from 'dva';
import { Icon, Button, List } from 'components';
import { getImages, getErrorImg, getLocalIcon, getDefaultBg } from 'utils';
import Photoheader from 'components/photoheader';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'homepage',
  Item = List.Item,
  Brief = Item.Brief;
const data = [
  { right: <Icon type="right" />, left: '勋章' },
  { right: '北京开放大学', left: '所属学院' },
];


function Userpage ({ location, dispatch, homepage, app }) {
  const { users: { username, useravatar } } = app;
  return (
    <div style={{ height: '100vh', background: 'white' }}>
      <div className={styles[`${PrefixCls}-top`]}>
        <Photoheader dispatch={dispatch} />
        <div className={styles[`${PrefixCls}-top-bg`]} style={{ backgroundImage: `url(${getDefaultBg(useravatar)})` }} />
        <div className={styles[`${PrefixCls}-top-avatar`]}>
          <img src={getImages(useravatar, 'user')} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-info`]}>
          <div className={styles[`${PrefixCls}-info-username`]}>李志</div>
          <div className={styles[`${PrefixCls}-info-signature`]}>东张西望，一无所长</div>
          <div className={styles[`${PrefixCls}-info-button`]}>
            <Button
              type="ghost"
              inline
              size="small"
            >发消息</Button>
          </div>
        </div>
      </div>
      <List className="my-list">
        {data.map((data, index) => (
          <Item extra={data.right}>{data.left}</Item>
        ))}
      </List>
      <div style={{ padding: '1rem 0', background: 'white' }}>
        <Button size="small"
          type="ghost"
          style={{ margin: '0 1rem' }}
          icon={<Icon color="#22609c" size="xs" type={getLocalIcon('/buttons/man.svg')} />}
        >添加联系人</Button>
      </div>
    </div>
  );
}

export default connect(({ homepage, app, login }) => ({
  homepage,
  app,
  login,
}))(Userpage);

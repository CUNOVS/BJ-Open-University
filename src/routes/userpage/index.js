/* eslint-disable indent */
import React from 'react';
import { connect } from 'dva';
import { Icon, Button, List } from 'components';
import { getImages, getErrorImg, getLocalIcon, getDefaultBg } from 'utils';
import Photoheader from 'components/photoheader';
import InnerHtml from 'components/innerhtml';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'userpage',
  Item = List.Item;


function Userpage ({ location, dispatch, userpage }) {
  const { data: { avatar = '', email = '', selfDescription = '', userName = '' } } = userpage;
  return (
    <div style={{ height: '100vh', background: 'white' }}>
      <div className={styles[`${PrefixCls}-top`]}>
        <Photoheader dispatch={dispatch} />
        <div className={styles[`${PrefixCls}-top-bg`]}
             style={{ backgroundImage: `url(${getDefaultBg(avatar)})` }} />
        <div className={styles[`${PrefixCls}-top-avatar`]}>
          <img src={getImages(avatar, 'user')} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-info`]}>
          <div className={styles[`${PrefixCls}-info-username`]}>{userName}</div>
          <div className={styles[`${PrefixCls}-info-signature`]}><InnerHtml data={selfDescription}/></div>
          <div className={styles[`${PrefixCls}-info-button`]}>
            <Button
              type="ghost"
              inline
              size="small"
            >发消息</Button>
          </div>
        </div>
      </div>
      <div className={styles[`${PrefixCls}-list`]}>
      <List>
        <Item extra={email}>邮箱</Item>
      </List>
      </div>
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

export default connect(({ userpage, app, login }) => ({
  userpage,
  app,
  login,
}))(Userpage);

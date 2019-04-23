/**
 * @author Lowkey
 * @date 2019/03/19 16:51:45
 * @Description:
 */
import React from 'react';
import { connect } from 'dva';
import { Icon, Button, WingBlank, Modal } from 'components';
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
  const { users: { username, useravatar } } = app,
    { data: { selfDescription = '', studentId = '', email = '' } } = homepage,
    handleLoginout = () => {
      dispatch({
        type: 'app/logout',
      });
    },
    showAlert = () => {
      Modal.alert('退出', '学习平台', [
        {
          text: ' 残忍退出',
          onPress: handleLoginout,
        },
        { text: '再看看', onPress: () => console.log('cancel') },

      ]);
    };
  return (
    <div>
      <div className={styles[`${PrefixCls}-top`]}>
        <Photoheader dispatch={dispatch} />
        <div style={{ overflow: 'hidden' }}>
          <div className={styles[`${PrefixCls}-top-bg`]}
               style={{ backgroundImage: `url(${getDefaultBg(useravatar)})` }}
          />
        </div>
        <div className={styles[`${PrefixCls}-top-avatar`]}>
          <img src={getImages(useravatar, 'user')} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-info`]}>
          <div className={styles[`${PrefixCls}-info-username`]}>{username}</div>
          <div className={styles[`${PrefixCls}-info-signature`]}>{}</div>

          <div className={styles[`${PrefixCls}-info-button`]}>
            <Button
              onClick={handlerChangeRouteClick.bind(this, 'setup', { name: '编辑' }, dispatch)}
              type="ghost"
              inline
              size="small"
            >编辑个人信息</Button>
          </div>
        </div>
      </div>
      <div className={styles[`${PrefixCls}-list`]}>
        <List className="my-list">
          <Item thumb={<Icon type={getLocalIcon('/sprite/studentID.svg')} />} extra={studentId}>学号</Item>
          <Item thumb={<Icon type={getLocalIcon('/sprite/email.svg')} />} extra={email}>Email</Item>
        </List>
      </div>
      <WingBlank>
        <Button style={{ border: '1px solid #fff', color: '#fff', background: '#ff5353' }}
                type="primary"
                onClick={showAlert}
        >退出</Button>
      </WingBlank>
    </div>
  );
}

export default connect(({ homepage, app }) => ({
  homepage,
  app,
}))(HomePage);

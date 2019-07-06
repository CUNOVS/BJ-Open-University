/**
 * @author Lowkey
 * @date 2019/03/19 16:51:45
 * @Description:
 */
import React from 'react';
import { connect } from 'dva';
import { Icon, Button, WingBlank, Modal, List } from 'components';
import { getImages, getErrorImg, getLocalIcon, getDefaultBg } from 'utils';
import Photoheader from 'components/photoheader';
import { routerRedux } from 'dva/router';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';

const PrefixCls = 'homepage',
  Item = List.Item;

function HomePage ({ location, dispatch, homepage, app }) {
  const { users: { username } } = app,
    { data: { id = '', email = '', phone = '', avatar = '', selfdescription = '' } } = homepage,
    handleLoginout = () => {
      dispatch({
        type: 'app/logout',
      });
    },
    showAlert = () => {
      Modal.alert('退出', '您确定要退出学习状态吗？', [
        {
          text: ' 立即退出',
          onPress: handleLoginout,
        },
        { text: '暂不', onPress: () => console.log('cancel') },

      ]);
    };

  return (
    <div >
      <div className={styles[`${PrefixCls}-top`]} >
        <Photoheader dispatch={dispatch} />
        <div style={{ overflow: 'hidden' }} >
          <div
            className={styles[`${PrefixCls}-top-bg`]}
            style={{ backgroundImage: `url(${getDefaultBg(avatar)})` }}
          />
        </div >
        <div className={styles[`${PrefixCls}-top-avatar`]} >
          <img src={getImages(avatar, 'user')} alt="" onError={(el => getErrorImg(el, 'user'))} />
        </div >
        <div className={styles[`${PrefixCls}-info`]} >
          <div className={styles[`${PrefixCls}-info-username`]} >{username}</div >
          <div className={styles[`${PrefixCls}-info-signature`]} >{selfdescription}</div >

          <div className={styles[`${PrefixCls}-info-button`]} >
            <Button
              onClick={handlerChangeRouteClick.bind(this, 'setup', { name: '编辑个人信息' }, dispatch)}
              type="primary"
              inline
              size="small"
            >编辑个人信息</Button >
          </div >
        </div >
      </div >
      <div className={styles[`${PrefixCls}-list`]} >
        <List className="my-list" >
          <Item thumb={<Icon type={getLocalIcon('/sprite/studentID.svg')} />} extra={id} >学号</Item >
          <Item thumb={<Icon type={getLocalIcon('/sprite/email.svg')} />} extra={email} >邮箱</Item >
          <Item thumb={<Icon type={getLocalIcon('/sprite/contacts.svg')} />} extra={phone} >手机号</Item >
        </List >
      </div >
      <WingBlank >
        <Button style={{ border: '1px solid #fff', color: '#fff', background: '#ff5353' }}
                type="primary"
                onClick={showAlert}
        >退出</Button >
      </WingBlank >
    </div >
  );
}

export default connect(({ homepage, app }) => ({
  homepage,
  app,
}))(HomePage);

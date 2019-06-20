import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon, ActivityIndicator, Toast, Modal } from 'components';
import Nav from 'components/nav';
import FileUpload from 'react-fileupload';
import { routerRedux } from 'dva/router';
import { getErrorImg, getImages, getLocalIcon, config, cookie } from 'utils';
import doUserAvatarUpload from 'utils/formsubmit';
import styles from './index.less';

const PrefixCls = 'setup',
  Item = List.Item,
  prompt = Modal.prompt,
  { api: { UploadFiles }, userTag } = config,
  { _cg } = cookie;


class Setup extends React.Component {
  constructor (props) {
    super(props);
  }

  handleUserNameClick = (user) => {
    prompt('修改昵称', '', [
      { text: '取消' },
      {
        text: '确定',
        onPress: (value) => {
          this.props.dispatch({
            type: 'setup/setUserInfo',
            payload: {
              params: { realName: value },
              images: {},
              mediaFile: {},
            },
          });
        },
      },
    ], 'default', `${user}`);
  };
  handlePassWordClick = () => {
    prompt(
      '修改密码',
      '',
      (newpassword, password) => (
        this.props.dispatch({
          type: 'setup/resetPassword',
          payload: {
            rawpassword: newpassword,
            passwd: password,
          },
        })
      ),
      'login-password',
      null,
      ['原密码', '新密码'],
    );
  };

  handleAboutUsClick = ({ name = '关于我们' }) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/aboutus',
      query: {
        name,
      },
    }));
  };

  render () {
    const { name = '' } = this.props.location.query,
      uploadSuccess = (res) => {
        const { itemid, userid } = res[0];
        this.props.dispatch({
          type: 'setup/setAvatar',
          payload: {
            draftitemid: itemid,
            userid
          }
        });
      },
      options = {
        baseUrl: `${UploadFiles}`,
        uploadSuccess: uploadSuccess.bind(this),
        accept: 'image/*',
        dataType: 'json',
        fileFieldName: 'photo',
        chooseFile (files) {
          doUserAvatarUpload(`${UploadFiles}`, { token: _cg(userTag.usertoken) }, {
            file: files[0],
          }, {}, true)
            .then((res) => {
              if (res.length > 0) {
                this.uploadSuccess(res);
              } else {
                Toast.fail('上传失败，请稍后再试', 2);
              }
            });
        },
      };

    const { users: { username, useravatar } } = this.props.app;
    return (
      <div >
        <Nav title={name} dispatch={this.props.dispatch} hasShadow />
        <WhiteSpace size="xs" />
        <div >
          <List className={`${PrefixCls}-list`} >
            <Item toExponential={0}>
              <div className={`${PrefixCls}-user-icon-upload`} >
                <FileUpload options={options} >
                  <p className={'icon-title-avatar'} ref="chooseBtn" >
                    <span >更换头像</span >
                  </p >
                  <div className={'icon-img-box'} >
                    <img src={getImages(useravatar, 'user')} alt="icon" onError={getErrorImg} />
                  </div >
                </FileUpload >
              </div >
            </Item >
            <Item extra={username} onClick={this.handleUserNameClick.bind(null, username)} >
              更换昵称
            </Item >
            <Item onClick={this.handlePassWordClick.bind(null, username)} >
              修改密码
            </Item >
            <Item onClick={this.handleAboutUsClick} >
              Email地址
            </Item >
            <Item >
              自述
            </Item >
          </List >
          <ActivityIndicator animating={this.props.loading} toast text="上传中..." />
        </div >
      </div >
    );
  }
}

export default connect(({ loading, setup, app }) => ({
  loading: loading.global,
  setup,
  app,
}))(Setup);

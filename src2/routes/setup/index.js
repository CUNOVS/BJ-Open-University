import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon, ActivityIndicator, Toast, Modal } from 'components';
import Nav from 'components/nav';
import FileUpload from 'react-fileupload';
import { routerRedux } from 'dva/router';
import { getErrorImg, getImages, getLocalIcon, config, cookie } from 'utils';
import doUserAvatarUpload from 'utils/formsubmit';
import './index.less';

const PrefixCls = 'setup',
  prompt = Modal.prompt,
  { api: { UploadFiles }, userTag } = config,
  { _cg } = cookie;


class Setup extends React.Component {
  constructor (props) {
    super(props);
  }

  handleEmailClick = (email) => {
    prompt('修改邮箱', '', [
      { text: '取消' },
      {
        text: '确定',
        onPress: (value) => {
          this.props.dispatch({
            type: 'setup/updateInfo',
            payload: {
              email: value
            },
          });
        },
      },
    ], 'default', `${email}`);
  };

  handlePhoneClick = (phone) => {
    prompt('修改手机号', '', [
      { text: '取消' },
      {
        text: '确定',
        onPress: (value) => {
          this.props.dispatch({
            type: 'setup/updateInfo',
            payload: {
              phone: value
            },
          });
        },
      },
    ], 'default', `${phone}`);
  };

  render () {
    const { name = '' } = this.props.location.query,
      { data: { email = '', phone = '' } } = this.props.homepage,
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

    const { users: { useravatar } } = this.props.app;
    return (
      <div >
        <Nav title={name} dispatch={this.props.dispatch} hasShadow />
        <WhiteSpace size="xs" />
        <div >
          <List className={`${PrefixCls}-list`} >
            <List.Item >
              <div className={`${PrefixCls}-user-icon-upload`} >
                <FileUpload options={options} >
                  <p className={'icon-title-avatar'} ref="chooseBtn" >
                    <span >更换头像</span >
                  </p >
                  <div className={'icon-img-box'} >
                    <img src={getImages(useravatar, 'user')} alt="icon" onError={(el => getErrorImg(el, 'user'))} />
                  </div >
                </FileUpload >
              </div >
            </List.Item >
            <List.Item extra={email} onClick={this.handleEmailClick.bind(null, email)} >
              邮箱
            </List.Item >
            <List.Item extra={phone} onClick={this.handlePhoneClick.bind(null, phone)} >
              手机号
            </List.Item >
          </List >
          <ActivityIndicator animating={this.props.loading} toast text="上传中..." />
        </div >
      </div >
    );
  }
}

export default connect(({ loading, setup, app, homepage }) => ({
  loading: loading.global,
  setup,
  app,
  homepage
}))(Setup);

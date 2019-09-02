import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { InputItem, WhiteSpace, WingBlank, Button, Toast, ActivityIndicator, Icon } from 'components';
import { getLocalIcon } from 'utils';
import { _cg } from 'utils/cookie';
import user from 'themes/images/login/user.png';
import pwd from 'themes/images/login/lock.png';
import bgs from 'themes/images/login/loginBg.png';
import styles from './index.less';


const PrefixCls = 'login';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  onSubmit = () => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        this.props.dispatch({
          type: 'login/login',
          payload: {
            ...this.props.form.getFieldsValue(),
          },
        });
      } else {
        Toast.fail('请确认信息是否正确', 2);
      }
    });
  };
  moveInput = () => { // 解决android键盘挡住input
    this.refs.button.scrollIntoView(true);
  };


  render () {
    const { getFieldProps, getFieldError } = this.props.form,
      userKey = 'username',
      powerKey = 'password';
    return (
      <div className={styles[`${PrefixCls}-container`]} style={{ backgroundImage: `url(${bgs})` }} >
        <div className={styles[`${PrefixCls}-logobox`]} >
          <form className={styles[`${PrefixCls}-form`]} >
            <WingBlank size="md" >
              <div className={styles[`${PrefixCls}-user`]} >
                <InputItem
                  placeholder="用户名"
                  onFocus={this.moveInput.bind(this)}
                  {...getFieldProps(userKey, {
                    initialValue: _cg('userloginname'),
                    rules: [{ required: true, message: '用户名必须输入' }, {
                      min: 1,
                      message:
                        '用户名小于1个字符',
                    }],
                  })}
                  clear
                  error={!!getFieldError(userKey)}
                  onErrorClick={() => {
                    Toast.fail(getFieldError(userKey));
                  }}
                >
                  <div style={{
                    backgroundImage: `url(${user})`,
                    backgroundSize: 'cover',
                    height: '22px',
                    width: '22px',
                  }}
                  />
                </InputItem >
              </div >
            </WingBlank >
            <WingBlank size="md" >
              <div className={styles[`${PrefixCls}-pwd`]} >
                <InputItem
                  type="password"
                  placeholder="密码"
                  onFocus={this.moveInput.bind(this)}
                  {...getFieldProps(powerKey, {
                    initialValue: this.props.login.loadPwd,
                    rules: [{ required: true, message: '密码必须输入' }, {
                      min: 1,
                      message:
                        '密码小于1个字符',
                    }],
                  })}
                  clear
                  error={!!getFieldError(powerKey)}
                  onErrorClick={() => {
                    Toast.fail(getFieldError(powerKey));
                  }}
                >
                  <div style={{
                    backgroundImage: `url(${pwd})`,
                    backgroundSize: 'cover',
                    height: '22px',
                    width: '22px',
                  }}
                  />
                </InputItem >
              </div >
              <WhiteSpace size="lg" />
            </WingBlank >
            <WingBlank size="md" >
              <div ref="button" >
                {
                  this.props.login.buttonState ? (
                    <Button
                      type="primary"
                      className="am-button-borderfix"
                      onClick={this.onSubmit.bind(this)}
                    >
                      登录
                    </Button >
                  ) : <Button loading type="primary" className="am-button-borderfix" disabled >
                    <span style={{ color: '#fff' }} >登录中...</span >
                  </Button >
                }
              </div >
            </WingBlank >
            <WhiteSpace size="lg" />
          </form >
        </div >
      </div >
    );
  }
}


export default connect(({ login, loading, app }) => ({
  login,
  loading,
  app,
}))(createForm()(Login));

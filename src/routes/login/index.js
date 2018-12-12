import React from 'react';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { InputItem, WhiteSpace, WingBlank, Button, Toast, ActivityIndicator, Icon } from 'components';
import { getLocalIcon } from 'utils';
import { config } from 'utils';
import { _cg } from 'utils/cookie';
import styles from './index.less';
import user from 'themes/images/login/user.png';
import pwd from 'themes/images/login/锁.png';
import bgs from 'routes/login/bgs.png';


const PrefixCls = 'login';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
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
        Toast.fail('请确认信息是否正确', 3);
      }
    });
  };
  moveInput = () => { // 解决android键盘挡住input
    this.refs.button.scrollIntoView(true);
  };

  handleBack = () => {
    this.props.dispatch(
      routerRedux.goBack(),
    );
  };

  render () {
    const { getFieldProps, getFieldError } = this.props.form,
      userKey = 'usrMail',
      powerKey = 'usrPwd'
    return (
      <div className={styles[`${PrefixCls}-container`]} style={{ backgroundImage: `url(${bgs})` }}>
        <div className={styles[`${PrefixCls}-container-goback`]} onClick={this.handleBack}>
          <Icon type={getLocalIcon('/login/goback.svg')} />
        </div>
        <div className={styles[`${PrefixCls}-phoneform`]}>
          <form>
            <WingBlank size="md">
              <div className={styles[`${PrefixCls}-phoneform-phonebox`]}>
                <InputItem placeholder="用户名"
                           name="phoneNum"
                           onFocus={this.moveInput.bind(this)}
                           {...getFieldProps(userKey, {
                             initialValue: _cg(userKey),
                             rules: [{ required: true, message: '用户名必须输入' }, {
                               min: 2,
                               message:
                                 '用户名小于2个字符',
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
                </InputItem>
              </div>
            </WingBlank>
            <WingBlank size="md">
              <div className={styles[`${PrefixCls}-phoneform-codebox`]}>
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
                </InputItem>
              </div>
              <WhiteSpace size="lg" />
            </WingBlank>
            <WingBlank size="md">
              <div ref="button">
                {
                  this.props.login.buttonState ? (
                    <Button type="primary"
                            className="am-button-borderfix"
                            onClick={this.onSubmit.bind(this)}
                    >
                      登录
                    </Button>
                  ) : <Button loading type="primary" className="am-button-borderfix" disabled>
                    <span style={{ color: '#fff' }}>登录中...</span>
                  </Button>
                }
              </div>
            </WingBlank>
            <WhiteSpace size="lg" />
          </form>
        </div>
      </div>
    );
  }
}


export default connect(({ login, loading, app }) => ({
  login,
  loading,
  app,
}))(createForm()(Login));

import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import {
  List,
  InputItem,
  TextareaItem,
  Button,
  Toast,
  WhiteSpace,
} from 'components';
import styles from './index.less';


const PrefixCls = 'reply';

class Reply extends Component {
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  }

  onSubmit = () => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
          ...this.props.form.getFieldsValue(),
        };
        this.props.dispatch({
          type: 'opinion/sendOpinion',
          payload: {
            ...data,
          },
        });
      } else {
        Toast.fail('意见必须输入');
      }
    });
  }
  renderRight = () => {
    return (
      <div className={styles[`${PrefixCls}-sendbutton`]}>发送</div>
    );
  }
  render () {
    const { name = '' } = this.props.location.query,
      { getFieldProps, getFieldError } = this.props.form;

    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} renderNavRight={this.renderRight()} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('content', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入内容' }],
                })}
                rows={10}
                count={200}
                placeholder={'请输入,最多200字'}
              />
            </List.Item>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, reply }) => ({
  loading,
  reply,
}))(createForm()(Reply));

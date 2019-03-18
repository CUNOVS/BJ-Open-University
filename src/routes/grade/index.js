/**
 * @author Lowkey
 * @date 2018/10/29
 * @Description: It is so...
 */
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
import Rate from 'rc-rate';
import '../../../node_modules/rc-rate/assets/index.css';
import styles from './index.less';


const PrefixCls = 'grade';

class Grade extends Component {
  constructor () {
    super();
    this.state = {
      value: 1,
    };
  }

  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  }
  getContent = (value) => {
    switch (value) {
      case 1:
        return '极差，课程糟糕，我忍不住要吐槽';
      case 2:
        return '差，我对课程不满意';
      case 3:
        return '中评,一般般没有勾起我的兴趣';
      case 4:
        return '良好,真的很不错';
      case 5:
        return '推荐,学习使我快乐';
    }
  }
  onSubmit = (isPatry) => {
    console.log(isPatry);
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
          ...this.props.form.getFieldsValue(),
        };
        if (isPatry) {
          this.props.dispatch({
            type: 'opinion/sendPatryOpinion',
            payload: {
              ...data,
            },
          });
        } else {
          this.props.dispatch({
            type: 'opinion/sendOpinion',
            payload: {
              ...data,
            },
          });
        }
      } else {
        Toast.fail('意见必须输入');
      }
    });
  }
  handlerOnChange = (value) => {
    this.setState({
      value
    });
  }

  render () {
    const { name = '', isPatry = false } = this.props.location.query,
      { getFieldProps, getFieldError } = this.props.form;

    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} hasShadow />
        <div className={styles[`${PrefixCls}-outer`]}>
          <div className={styles[`${PrefixCls}-outer-title`]}>我的评分</div>
          <div className={styles[`${PrefixCls}-outer-rate`]}>
            <Rate style={{ fontSize: '34px' }} defaultValue={1} onChange={this.handlerOnChange} />
            <div className={styles[`${PrefixCls}-outer-rate-content`]}>{this.getContent(this.state.value)}</div>
          </div>
          <form>
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('content', {
                  initialValue: '',
                  rules: [{ required: false, message: '请写下对本课程的评价' }],
                })}
                count={200}
                rows={10}
                placeholder={'请写下对本课程的评价'}
              />
            </List.Item>
            <div className={styles[`${PrefixCls}-outer-button`]}>
              <Button type="ghost" onClick={this.onSubmit}>提交</Button>
            </div>
          </form>
          <div className={styles[`${PrefixCls}-outer-footer`]}>
            (*^_^*)欢迎为我们提出宝贵的意见或建议
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, grade }) => ({
  loading,
  grade,
}))(createForm()(Grade));

/**
 * @author Lowkey
 * @date 2019/02/28 11:58:51
 * @Description:
 */
import React from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import Examination from './components/examination';
import { Icon, List, Button, NoticeBar, WingBlank, WhiteSpace } from 'components';
import { getImages, getErrorImg, getLocalIcon, getCommonData } from 'utils';
import styles from './index.less';


const PrefixCls = 'quizReview',
  Item = List.Item,
  Brief = Item.Brief;

@connect(({ quizReview, loading }) => ({ // babel装饰器语法糖
  quizReview,
  loading: loading.effects[`${PrefixCls}/queryQuiz`],
}))
class QuizReview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }


  componentDidMount () {

  }

  getState = (state) => {
    if (state === 'finished') {
      return '完成';
    } else {
      return '-';
    }
  };

  render () {
    const { name = '回顾' } = this.props.location.query,
      { data: { additionaldata, attempt, questions } } = this.props.quizReview,
      { loading } = this.props
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles.feedBack}>
          <List renderHeader={() => '回顾'} className="my-list">
            <Item extra={getCommonData(attempt.timestart)}>开始时间</Item>
            <Item extra={this.getState(attempt.state)}>状态</Item>
            <Item extra={getCommonData(attempt.timefinish)}>完成于</Item>
            <Item extra={'extra content'}>耗时</Item>
            <Item extra={'extra content'}>成绩</Item>
            <Item extra={'extra content'}>反馈</Item>
          </List>
        </div>
        <Examination />
      </div>
    );
  }
}


export default QuizReview;

/**
 * @author Lowkey
 * @date 2019/02/28 11:58:51
 * @Description:
 */
import React from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Icon, List, Button, NoticeBar, WingBlank, WhiteSpace } from 'components';
import { getImages, getErrorImg, getLocalIcon, getCommonDate, getDurationTime } from 'utils';
import Examination from './components/examination';
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
      { data: { additionaldata, attempt = [] }, questions } = this.props.quizReview,
      { timestart = 0, state = '', timefinish = 0, sumgrades = null } = attempt,
      { loading } = this.props;
    const props = {
      questions
    };
    return (
      <div >
        <Nav title={name} dispatch={this.props.dispatch} backNum={-2} />
        <div className={styles.feedBack} >
          <List className="my-list" >
            <Item extra={timestart ? getCommonDate(timestart) : '-'} >开始时间</Item >
            <Item extra={this.getState(state)} >状态</Item >
            <Item extra={getCommonDate(timefinish)} >完成于</Item >
            <Item extra={getDurationTime(timestart, timefinish)} >耗时</Item >
            <Item extra={sumgrades || '还未评分'} >成绩</Item >
            {/*<Item extra={'extra content'} >反馈</Item >*/}
          </List >
        </div >
        <WhiteSpace />
        <div className={styles.outer} >
          <Examination {...props}/>
        </div >
      </div >
    );
  }
}


export default QuizReview;

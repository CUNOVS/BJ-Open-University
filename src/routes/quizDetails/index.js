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
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import styles from './index.less';


const PrefixCls = 'quizDetails';

@connect(({ quizDetails, loading }) => ({ // babel装饰器语法糖
  quizDetails,
  loading: loading.effects[`${PrefixCls}/queryQuiz`],
}))
class QuizDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }


  componentDidMount () {

  }

  render () {
    const { name } = this.props.location.query,
      { data } = this.props.quizDetails,
      { loading } = this.props;

    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer-container`]}>
          <Examination />
        </div>
      </div>
    );
  }
}


export default QuizDetails;

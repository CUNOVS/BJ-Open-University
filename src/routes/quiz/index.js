/**
 * @author Lowkey
 * @date 2019/02/28 11:58:51
 * @Description: 修改 wkc
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Icon, List, Button, NoticeBar, WingBlank, WhiteSpace } from 'components';
import { handlerChangeRouteClick } from 'utils/commonevents';
import Status from './components/status';
import GradeBox from './components/gradebox';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import styles from './index.less';
import Introduction from 'components/introduction';

const PrefixCls = 'quiz',
  Item = List.Item;

@connect(({ quiz, loading }) => ({ // babel装饰器语法糖
  quiz,
  loading: loading.effects[`${PrefixCls}/queryQuiz`],
}))
class Quiz extends PureComponent {
  getMethod = (type) => {
    switch (type) {
      case 1:
        return '最高分';
        break;
      case 2:
        return '平均分';
        break;
      case 3:
        return '第一次答题';
        break;
      case 4:
        return '最后一次答题';
        break;
      default:
        return '-';
    }
  };

  componentDidMount () {
    const { courseid, quizid } = this.props.location.query;
    this.props.dispatch({
      type: 'quiz/queryQuiz',
      payload: {
        courseid,
        quizid,
      },
    });
  }

  render () {
    const { name } = this.props.location.query,
      { data: { id, intro, options = {}, buttontext, hasquestions, visiblebutton, attempts = [], feedbacktext, hasfeedback, finalgrade, grademethod, maxgrade, isfinished, preventnewattemptreasons = [] }, info = {} } = this.props.quiz,
      { preventaccessreasons = [] } = options,
      { loading, dispatch } = this.props;
    const { data } = this.props.quiz;
    const method = this.getMethod(grademethod);
    const gradePros = { isfinished, maxgrade, finalgrade, method };
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <Nav title={name} dispatch={dispatch} />
        {!hasquestions || hasquestions === 0 ? <NoticeBar mode="closable" icon={null}>尚未添加试题</NoticeBar> : ''}
        <div className={styles[`${PrefixCls}-describe`]}>
          {!loading ? <Introduction data={intro} /> : ''}
        </div>
        <div className={styles[`${PrefixCls}-info`]}>
          {cnIsArray(options.accessrules) && options.accessrules.map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
        </div>
        <div className={styles[`${PrefixCls}-method`]}>
          <span>评分方法</span>
          <span>{this.getMethod(grademethod)}</span>
        </div>
        {
          cnIsArray(attempts) && attempts.length > 0
            ?
            <Status data={attempts} maxgrade={maxgrade} dispatch={dispatch} />
            :
            ''
        }
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <GradeBox {...gradePros} />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WingBlank>
          {visiblebutton ?
            <Button
              type="primary"
              onClick={handlerChangeRouteClick
                .bind(null, 'quizDetails',
                  {
                    quizid: id,
                    name,
                    ...info,
                  },
                  dispatch)}
            >{buttontext}</Button> : ''}
        </WingBlank>
        {preventnewattemptreasons.length > 0 ?
          <NoticeBar mode="closable" icon={null}>{preventnewattemptreasons[0]}</NoticeBar> : ''}
        {preventaccessreasons.length > 0 ?
          <NoticeBar mode="closable" icon={null}>{preventaccessreasons[0]}</NoticeBar> : ''}
      </div>
    );
  }
}

export default Quiz;

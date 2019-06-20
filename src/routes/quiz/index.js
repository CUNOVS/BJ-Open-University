/**
 * @author Lowkey
 * @date 2019/02/28 11:58:51
 * @Description: 修改 wkc
 */
import React, { PureComponent } from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Icon, List, Button, NoticeBar, WingBlank, WhiteSpace, Modal } from 'components';
import { handlerChangeRouteClick } from 'utils/commonevents';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import { ContentSkeleton } from 'components/skeleton';
import Introduction from 'components/introduction';
import Status from './components/status';
import GradeBox from './components/gradebox';
import styles from './index.less';

const PrefixCls = 'quiz';
const alert = Modal.alert;

@connect(({ quiz, loading }) => ({ // babel装饰器语法糖
  quiz,
  loading: loading.effects[`${PrefixCls}/queryQuiz`],
}))
class Quiz extends PureComponent {

  constructor (props) {
    super(props);
    this.state = {
      startTime: 0
    };
  }

  componentDidMount () {
    const { courseid, quizid, cmid, type = 'mod', modname } = this.props.location.query;
    this.props.dispatch({
      type: 'quiz/queryQuiz',
      payload: {
        courseid,
        quizid,
        cmid
      },
    });

    this.setState(() => ({
      startTime: new Date()
    }));
    this.props.dispatch({
      type: 'app/logApi',
      payload: {
        assesstime: new Date().getTime(),
        courseid,
        cmid,
        type,
        modname
      }
    });

  }

  componentWillUnmount () {
    const { courseid = '', cmid = '' } = this.props.location.query;
    this.props.dispatch({
      type: 'app/accessTime',
      payload: {
        startedat: this.state.startTime.getTime(),
        endedat: new Date().getTime(),
        courseid,
        cmid,

      }
    });
  }

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

  showModal = () => {
    const { name } = this.props.location.query,
      { data: { id, navmethod = '', options = {} }, info = {} } = this.props.quiz;
    const { dispatch } = this.props;
    const { accessrules = [] } = options;
    alert('限时测验', `${accessrules[2] || ''}。时间将从你开始做测验时倒数计时，而你必须在时限到之前提交答案。你确定你现在就要开始作答？`, [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '开始', onPress: () => handlerChangeRouteClick('quizDetails',
          {
            quizid: id,
            name,
            ...info,
            navmethod
          },
          dispatch)
      },
    ]);
  };

  render () {
    const { name } = this.props.location.query,
      { data: { id, intro, options = {}, buttontext, hasquestions, visiblebutton, attempts = [], feedbacktext, hasfeedback, finalgrade, grademethod, maxgrade, isfinished, preventnewattemptreasons = [], courseid, name: quizName = '', navmethod = '', timelimit }, info = {} } = this.props.quiz,
      { preventaccessreasons = [] } = options,
      { loading, dispatch } = this.props;
    const method = this.getMethod(grademethod);
    const gradePros = {
      isfinished,
      maxgrade,
      finalgrade,
      method,
      hasfeedback,
      feedbacktext,
      dispatch: this.props.dispatch
    };
    return (
      <div className={styles[`${PrefixCls}-outer`]} >
        <Nav title={name || quizName} dispatch={dispatch} />
        {loading ? <ContentSkeleton /> : <div >
          {hasquestions === 0 ? <NoticeBar mode="closable" icon={null} >尚未添加试题</NoticeBar > : ''}
          <div className={styles[`${PrefixCls}-describe`]} >
            {intro !== '' ? <Introduction data={intro} courseid={courseid} dispatch={this.props.dispatch} /> : ''}
          </div >
          <div className={styles[`${PrefixCls}-info`]} >
            {cnIsArray(options.accessrules) && options.accessrules.map((item, i) => {
              return <div key={i} >{item}</div >;
            })}
          </div >
          <div className={styles[`${PrefixCls}-method`]} >
            <span >评分方法</span >
            <span >{this.getMethod(grademethod)}</span >
          </div >
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
          <WingBlank >
            {visiblebutton ?
              <Button
                type="primary"
                onClick={timelimit > 0 ? this.showModal : handlerChangeRouteClick
                  .bind(null, 'quizDetails',
                    {
                      quizid: id,
                      name,
                      ...info,
                      navmethod
                    },
                    dispatch)}
              >{buttontext}</Button > : ''}
          </WingBlank >
          {preventnewattemptreasons.length && !visiblebutton > 0 ?
            <NoticeBar mode="closable" icon={null} >{preventnewattemptreasons[0]}</NoticeBar > : ''}
          {preventaccessreasons.length > 0 && !visiblebutton ?
            <NoticeBar mode="closable" icon={null} >{preventaccessreasons[0]}</NoticeBar > : ''}
        </div >}
      </div >
    );
  }
}

export default Quiz;

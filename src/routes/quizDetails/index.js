/**
 * @author Lowkey
 * @date 2019/02/28 11:58:51
 * @Description:
 */
import React from 'react';
import Nav from 'components/nav';
import classNames from 'classnames';
import { connect } from 'dva';
import { Icon, List, Button, NoticeBar, WingBlank, WhiteSpace, Drawer, Toast } from 'components';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import Examination from './components/examination';
import styles from './index.less';


const PrefixCls = 'quizDetails';


@connect(({ quizDetails, loading }) => ({ // babel装饰器语法糖
  quizDetails,
  loading: loading.effects[`${PrefixCls}/queryExamination`],
}))
class QuizDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }


  componentDidMount () {


  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  hanlerSubmit = (data, type = 'progress') => {
    const { attemptid = '', } = this.props.quizDetails;
    const { name, quizid = '' } = this.props.location.query;
    this.props.dispatch({
      type: 'quizDetails/sendQuiz',
      payload: {
        data,
        attemptid,
        timeup: type === 'auto' ? 1 : 0,
        finishattempt: type === 'auto' ? 1 : 0,
        type,
        name,
        quizid
      }
    });
  };

  warningClick = () => {
    Toast.fail('固定导航，只能按顺序答题');
  };

  sidebar = (questions) => {
    const { quizDetails: { page = '', navmethod = '' } } = this.props;
    return (
      <List className={styles.list} >
        {questions.map((item, index) => {
          return (<List.Item
            key={item.slot}
            arrow={navmethod === 'sequential' ? '' : 'horizontal'}
            onClick={navmethod !== 'sequential' ? () => this.child.navigatorClick(item.page) : this.warningClick}
          >
            <span
              style={{ paddingLeft: '10px' }}
              className={classNames({ [styles.active]: item.page == page })} >
              {`题目${item.slot}`}
              </span >
          </List.Item >);
        })}
        <List.Item
          arrow="horizontal"
          onClick={() => this.child.onSubmit('finish')}
        >
          结束答题
        </List.Item >
      </List >
    );
  };

  onRef = (ref) => {
    this.child = ref;
  };

  render () {
    const { name, quizid = '', } = this.props.location.query,
      { questions, navmethod = '' } = this.props.quizDetails,
      { loading } = this.props;
    const props = {
      quizid,
      navmethod
    };
    return (
      <div className={styles[`${PrefixCls}-outer`]} >
        <Nav
          title={name}
          dispatch={this.props.dispatch}
          renderNavRight={
            <Icon
              type={getLocalIcon('/components/navigation.svg')}
              color="#fff"
              onClick={this.onOpenChange}
            />
          }
          isAlert
        />
        <Drawer
          className={styles[`${PrefixCls}-my-drawer`]}
          style={{ minHeight: document.documentElement.clientHeight - 90 }}
          sidebar={this.sidebar(questions)}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
          position="right"
        >
          <div className={styles[`${PrefixCls}-outer-container`]} >
            <Examination onRef={this.onRef} {...props} hanlerSubmit={this.hanlerSubmit} />
          </div >
        </Drawer >
      </div >
    );
  }
}


export default QuizDetails;

/* WKC
我的课程页 */
import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { progressRow } from 'components/row';
import { handleLessonClick } from 'utils/commonevents';
import styles from './index.less';
import { connect } from 'dva';
import { getLocalIcon } from 'utils';
import { WhiteSpace, Grid, List, Icon, Layout, ActionSheet, Button } from 'components';


const PrefixCls = 'listOfCourses';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Courses extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      clicked: 'none',
    };
  }

  showActionSheet = () => {
    const BUTTONS = ['全部', '正在进行', '即将开始', '已结束', '报名下次开课', '取消'];
    console.log(ActionSheet)
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      // title: 'title',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
      console.log(buttonIndex);
    });
  };

  render () {
    const { listData } = this.props.courses,
      { name = '' } = this.props.location.query;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <WhiteSpace size="sm" />
        <div className={styles[`${PrefixCls}-Butt`]}>
          <div>我的课程</div>
          <Button onClick={this.showActionSheet} size="small" style={{ border: 'none', width: '20%' }}>全部</Button>
        </div>
        <div className={styles[`${PrefixCls}-container`]}>
          {
            listData && listData.map((data, i) => {
              return progressRow(data, handleLessonClick.bind(null, this.props.dispatch));
            })
          }
        </div>
      </div>
    );
  }
}

export default connect(({ courses }) => ({
  courses,
}))(Courses);

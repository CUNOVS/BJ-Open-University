/* eslint-disable one-var,one-var-declaration-per-line,import/first */
import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Layout, WhiteSpace, Icon, List, Tabs } from 'components';
import { taskRow, taskLessonRow } from 'components/row';
import styles from './index.less';
import { getLocalIcon } from 'utils';
import { handleLessonClick, handlerChangeRouteClick } from 'utils/commonevents';
import Notice from 'components/noticebar/index';
import TimeLine from 'components/timeline/index';


const PrefixCls = 'dashboard';

const Dashboard = ({ dashboard, loading, dispatch }) => {
  const data = [
    {
      title: '儿童学习与发展',
      endDate: '03月05日',
      content: '作业（第一周）：设计幼儿园班级户外体育活动（10分，考勤活动）',
      isToday: 1,
      icon: '/lessontype/homework.svg',
    },
    {
      title: '北京历史文化',
      endDate: '03月08日',
      content: '学习活动2.1：主题活动（二选一，5分）',
      isToday: 0,
      icon: '/lessontype/huodong.svg',
    },
    {
      title: '大学英语（2）',
      endDate: '03月09日',
      content: '测验（第三周）：请用英文写一篇关与《流浪地球》的影评（10分，考勤活动）',
      isToday: 0,
      icon: '/lessontype/icon.svg',
    },
  ];
  const data2 = [
    {
      title: '3-6儿童学习与发展',
      teacher: '彭海蕾',
      endDate: '03月05日',
      image: require('../../themes/images/linshi/child.png'),
    },
    {
      title: '北京历史文化',
      teacher: '马冬梅',
      endDate: '03月08日',
      image: require('../../themes/images/linshi/beijing.png'),
    },
    {
      title: '大学英语（2）',
      teacher: '邓爱珍',
      endDate: '03月09日',
      image: require('../../themes/images/linshi/english.png'),
    },
  ];
  const tabs = [
    { title: '本周未完成任务' },
    { title: '全部未完成任务' },
  ];

  const { Header } = Layout,
    { bannerNotice } = dashboard;

  const moreMessage = () => {
    dispatch(routerRedux.push({
      pathname: '/moreMessage',
      query: {
        name: '通知',
      },
    }));
  };
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Header handlerClick={handlerChangeRouteClick.bind(null, 'messageCenter', { name: '消息中心' }, dispatch)} />
      <Notice banner={bannerNotice} messageL={moreMessage} />
      <WhiteSpace />
      <Tabs tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => {
          console.log('onChange', index, tab);
        }}
        onTabClick={(tab, index) => {
          console.log('onTabClick', index, tab);
        }}
        tabBarInactiveTextColor="#b7b7b7"
        tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
      >
        <div>
          <TimeLine />
          <div className={styles[`${PrefixCls}-tasklist`]}>
            {cnIsArray(data) && data.map((item, i) => {
              return taskRow(item, handlerChangeRouteClick.bind(null, 'homeworkdetails', { name: '作业' }, dispatch));
            })}
          </div>
        </div>
        <div className={styles[`${PrefixCls}-tasklist`]}>
          <WhiteSpace />
          {cnIsArray(data2) && data2.map((item, i) => {
            return taskLessonRow(item, handlerChangeRouteClick.bind(null, 'lessondetails', { name: '3-6岁儿童学习与发展' }, dispatch));
          })}
        </div>
      </Tabs>
      <WhiteSpace />
    </div>
  );
};

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard);

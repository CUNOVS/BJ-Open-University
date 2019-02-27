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

  const tabs = [
    { title: '本周未完成任务' },
    { title: '全部未完成任务' },
  ];

  const { BaseLine, Header } = Layout,
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
      <WhiteSpace size="xs" />
      <Notice banner={bannerNotice} messageL={moreMessage} />
      <WhiteSpace size="xs" />
      <Tabs tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => {
              console.log('onChange', index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log('onTabClick', index, tab);
            }}
            tabBarActiveTextColor='#22609c'
            tabBarInactiveTextColor="#b7b7b7"
            tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
      >
        <div>
          <TimeLine />
          <div className={styles[`${PrefixCls}-tasklist`]}>
            {taskRow(handlerChangeRouteClick.bind(null, 'homeworkdetails', { name: '作业' }, dispatch))}
          </div>
        </div>
        <div className={styles[`${PrefixCls}-tasklist`]}>
          {taskLessonRow(handlerChangeRouteClick.bind(null, 'lessondetails', { name: '3-6岁儿童学习与发展' }, dispatch))}
        </div>
      </Tabs>
      <WhiteSpace size="xs" />
    </div>
  );
};

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard);

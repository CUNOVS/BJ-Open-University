/* eslint-disable one-var,one-var-declaration-per-line,import/first */
import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Layout, WhiteSpace, Icon, List, Tabs } from 'components';
import Refresh from 'components/pulltorefresh';
import { taskRow, taskLessonRow } from 'components/row';
import styles from './index.less';
import { getLocalIcon } from 'utils';
import { handlerLessonListClick, handlerChangeRouteClick, handlerCourseClick } from 'utils/commonevents';
import Notice from 'components/noticebar/index';
import TimeLine from 'components/timeline/index';
import { ListSkeleton } from 'components/skeleton';


const PrefixCls = 'dashboard';

const Dashboard = ({ dashboard, loadingTask, dispatch }) => {

  const tabs = [
    { title: '本周未完成任务' },
    { title: '全部未完成任务' },
  ];

  const { Header } = Layout,
    { taskList = [], bannerNotice, taskAllList = [], refreshing = false, selectIndex = 0, count = '' } = dashboard,
    moreMessage = () => {
      dispatch(routerRedux.push({
        pathname: '/moreMessage',
        query: {
          name: '通知',
        },
      }));
    },
    onTabsChange = (tabs, index) => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          selectIndex: index,
        },
      });
      if (index === 1) {
        dispatch({
          type: `${PrefixCls}/queryAllTask`,
        });
      }
    },
    onRefresh = (type) => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          refreshing: true,
        },
      });
      dispatch({
        type: `${PrefixCls}/${type}`,
      });
    };
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Header count={count}
              handlerClick={handlerChangeRouteClick.bind(null, 'messageCenter', { name: '消息中心' }, dispatch)} />
      <Notice banner={bannerNotice} messageL={moreMessage} />
      <WhiteSpace />
      <Tabs tabs={tabs}
            initialPage={0}
            page={selectIndex}
            onChange={onTabsChange}
            tabBarInactiveTextColor="#b7b7b7"
            tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
      >
        <div>
          <TimeLine />
          <div className={styles[`${PrefixCls}-tasklist`]}>
            {loadingTask ? <ListSkeleton /> :
              <Refresh refreshing={refreshing} onRefresh={onRefresh.bind(null, 'query')}>
                {cnIsArray(taskList) && taskList.map((item, i) => {
                  return taskRow(item, handlerCourseClick.bind(null, item, item.courseid, dispatch));
                })}
              </Refresh>}

          </div>
        </div>
        <div className={styles[`${PrefixCls}-tasklist`]}>
          <WhiteSpace />
          <Refresh refreshing={refreshing} onRefresh={onRefresh.bind(null, 'queryAllTask')}>
            {cnIsArray(taskAllList) && taskAllList.map((item, i) => {
              return taskLessonRow(item, handlerLessonListClick, dispatch);
            })}
          </Refresh>
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

export default connect(({ dashboard, loading }) => ({
  dashboard,
  loadingTask: loading.effects[`${PrefixCls}/query`],
}))(Dashboard);

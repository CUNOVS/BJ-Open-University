import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Layout, WhiteSpace, Icon, List, Tabs } from 'components';
import Refresh from 'components/pulltorefresh';
import { taskRow, taskLessonRow } from 'components/row';
import { getLocalIcon } from 'utils';
import {
  handlerLessonListClick,
  handlerChangeRouteClick,
  handlerCourseClick,
  handlerDivInnerHTMLClick
} from 'utils/commonevents';
import Notice from 'components/noticebar/index';
import TimeLine from 'components/timeline/index';
import NoContent from 'components/nocontent';
import { ListSkeleton } from 'components/skeleton';
import styles from './index.less';

const PrefixCls = 'dashboard';
const Dashboard = ({ dashboard, loadingTask, loadingAllTask, dispatch }) => {
  const tabs = [
    { title: '本周未完成任务' },
    { title: '全部未完成任务' },
  ];

  const { Header, BaseLine } = Layout,
    { taskList, taskAllList, refreshing = false, selectIndex = 0, count = '', sysNotice } = dashboard,
    moreMessage = (text) => {
      dispatch(routerRedux.push({
        pathname: '/details',
        query: {
          type: 'detailsText',
          content: text,
          name: '通知详情'
        },
      }));
    },
    onTabsChange = (tab, index) => {
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
    <div className={styles[`${PrefixCls}-outer`]} >
      <Header
        count={count}
        handlerClick={handlerChangeRouteClick.bind(null, 'messageCenter', { name: '消息中心' }, dispatch)}
      />
      {sysNotice.noticeContent && sysNotice.noticeContent !== '' ?
        <Notice content={sysNotice.noticeContent} click={() => moreMessage(sysNotice.noticeContent)} />
        :
        null
      }
      <WhiteSpace />
      <Tabs
        tabs={tabs}
        initialPage={0}
        swipeable={false}
        page={selectIndex}
        onChange={onTabsChange}
        tabBarInactiveTextColor="#b7b7b7"
        tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
      >
        <div >
          <TimeLine />
          <WhiteSpace />
          <div className={styles[`${PrefixCls}-tasklist`]} >
            {loadingTask && !refreshing ?
              <ListSkeleton />
              :
              cnIsArray(taskList) && taskList.length > 0 ?
                <Refresh refreshing={refreshing} onRefresh={onRefresh.bind(null, 'query')} >
                  {taskList.map((item, i) => {
                    return taskRow(item, handlerCourseClick.bind(null, item, item.courseid, dispatch), (e) => handlerDivInnerHTMLClick(e, item.courseid, dispatch));
                  })}
                  <BaseLine />
                </Refresh >
                :
                <NoContent />
            }
          </div >
        </div >
        <div className={styles[`${PrefixCls}-tasklist`]} >
          <WhiteSpace />
          {loadingAllTask && !refreshing ?
            <ListSkeleton />
            :
            cnIsArray(taskAllList) && taskAllList.length > 0 ?
              <Refresh refreshing={refreshing} onRefresh={onRefresh.bind(null, 'queryAllTask')} >
                {taskAllList.map((item, i) => {
                  return taskLessonRow(item, handlerLessonListClick, dispatch);
                })}
                <BaseLine />
              </Refresh >
              :
              <NoContent />
          }
        </div >
      </Tabs >
    </div >
  );
};

Dashboard.propTypes = {};

export default connect(({ dashboard, loading }) => ({
  dashboard,
  loadingTask: loading.effects[`${PrefixCls}/query`],
  loadingAllTask: loading.effects[`${PrefixCls}/queryAllTask`]
}))(Dashboard);

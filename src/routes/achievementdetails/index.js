import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'components';
import Photoheader from 'components/photoheader';
import { handlerGradeItemClick } from 'utils/commonevents';
import Refresh from 'components/pulltorefresh';
import { achievementDetailsRow } from 'components/row';
import styles from './index.less';

const PrefixCls = 'achievementdetails';
const AchievementDetails = ({ location, dispatch, achievementdetails, app }) => {
  const { gradeItems, refreshing, scrollerTop, grade: coursegrade = 0, courseid: retrunCourseid = '', coursename} = achievementdetails,
    { groups } = app,
    { name, grade, courseid } = location.query,
    getGroups = (group, id) => {
      const arr = [];
      cnIsArray(groups) && groups.filter(item => item.courseid.toString() === id.toString())
        .map((data, i) => {
          arr.push({
            label: data.name,
            value: data.id
          });
        });
      return arr[0].label;
    },
    onRefresh = () => {

    },
    onScrollerTop = (top) => {
      if (typeof top !== 'undefined' && !isNaN(top * 1)) {
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top,
          },
        });
      }
    };
  return (
    <div>
      <Photoheader hasBg={false} dispatch={dispatch} size="lg"/>
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-head`]}>
          <div className={styles[`${PrefixCls}-outer-head-info`]}>
            <div className={styles[`${PrefixCls}-outer-head-info-title`]}>{name || coursename}</div>
            <div
              className={styles[`${PrefixCls}-outer-head-info-group`]}>{getGroups(groups, courseid || retrunCourseid)}</div>
          </div>
          <div className={styles[`${PrefixCls}-outer-head-achievement`]}>
            <div className={styles[`${PrefixCls}-outer-head-achievement-num`]}>{`${grade ? grade : coursegrade}`}</div>
            <div className={styles[`${PrefixCls}-outer-head-achievement-text`]}>我的得分</div>
          </div>
        </div>
      </div>
      <WhiteSpace/>
      <div className={styles[`${PrefixCls}-outer-list`]}>
        <Refresh
          refreshing={refreshing}
          onRefresh={onRefresh}
          scrollerTop={scrollerTop}
          onScrollerTop={onScrollerTop.bind(null)}
        >
          {cnIsArray(gradeItems) && gradeItems.map((item) => {
            return achievementDetailsRow(item, handlerGradeItemClick, dispatch);
          })}
        </Refresh>
      </div>
    </div>
  );
};
export default connect(({ loading, achievementdetails, app }) => ({
  loading,
  achievementdetails,
  app,
}))(AchievementDetails);

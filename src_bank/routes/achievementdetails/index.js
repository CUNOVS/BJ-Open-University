import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'components';
import Photoheader from 'components/photoheader';
import { handlerGradeItemClick } from 'utils/commonevents';
import Refresh from 'components/pulltorefresh';
import { achievementDetailsRow } from 'components/row';
import styles from './index.less';

const PrefixCls = 'achievementdetails';
const AchievementDetails = ({ location, dispatch, achievementdetails }) => {
  const { gradeItems, refreshing } = achievementdetails,
    { name, grade, cmid } = location.query,
    onRefresh = () => {

    };
  return (
    <div>
      <Photoheader hasBg={false} dispatch={dispatch} size="lg" />
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-head`]}>
          <div className={styles[`${PrefixCls}-outer-head-info`]}>
            <div className={styles[`${PrefixCls}-outer-head-info-title`]}>{name}</div>
            <div className={styles[`${PrefixCls}-outer-head-info-group`]}>16、17级学前高起本班</div>
          </div>
          <div className={styles[`${PrefixCls}-outer-head-achievement`]}>
            <div className={styles[`${PrefixCls}-outer-head-achievement-num`]}>{grade}</div>
            <div className={styles[`${PrefixCls}-outer-head-achievement-text`]}>我的得分</div>
          </div>
        </div>
      </div>
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer-list`]}>
        <Refresh refreshing={refreshing} onRefresh={onRefresh}>
          {cnIsArray(gradeItems) && gradeItems.map((item) => {
            return achievementDetailsRow(item, handlerGradeItemClick, cmid, dispatch);
          })}
        </Refresh>
      </div>
    </div>
  );
};
export default connect(({ loading, achievementdetails }) => ({
  loading,
  achievementdetails,
}))(AchievementDetails);

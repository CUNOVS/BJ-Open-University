import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'components';
import Photoheader from 'components/photoheader';
import { handlerChangeRouteClick } from 'utils/commonevents';
import { achievementDetailsRow } from 'components/row';
import styles from './index.less';

const PrefixCls = 'achievementdetails';
const AchievementDetails = ({ dispatch, achievementdetails }) => {
  return (
    <div>
      <Photoheader hasBg={false} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-head`]}>
          <div className={styles[`${PrefixCls}-outer-head-info`]}>
            <div className={styles[`${PrefixCls}-outer-head-info-title`]}>3-6岁儿童学习与发展</div>
            <div className={styles[`${PrefixCls}-outer-head-info-group`]}>16、17级学前高起本班</div>
          </div>
          <div className={styles[`${PrefixCls}-outer-head-achievement`]}>
            <div className={styles[`${PrefixCls}-outer-head-achievement-num`]}>91.49</div>
            <div className={styles[`${PrefixCls}-outer-head-achievement-text`]}>我的得分</div>
          </div>
        </div>
      </div>
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer-list`]}>
        {achievementDetailsRow(handlerChangeRouteClick.bind(null, 'forum', { name: '我的成绩' }, dispatch))}
      </div>
    </div>
  );
};
export default connect(({ loading, achievementdetails }) => ({
  loading,
  achievementdetails,
}))(AchievementDetails);

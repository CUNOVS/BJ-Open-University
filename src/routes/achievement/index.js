import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { achievementRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'achievement';

function Achievement ({ location, dispatch, achievement }) {
  const { listData } = achievement;
  const { BaseLine } = Layout;

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title="我的成绩" hasShadow dispatch={dispatch} />
      <div>
        <WhiteSpace />
        {achievementRow(handlerChangeRouteClick.bind(null, 'achievementdetails', { name: '成绩详情' }, dispatch))}
      </div>
    </div>
  );
}

export default connect(({ loading, achievement }) => ({
  loading,
  achievement,
}))(Achievement);

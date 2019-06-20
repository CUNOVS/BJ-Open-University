import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { achievementRow } from 'components/row';
import NoContent from 'components/nocontent';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'achievement';

function Achievement ({ location, dispatch, achievement }) {
  const { listData } = achievement;

  return (
    <div className={styles[`${PrefixCls}-outer`]} >
      <Nav title="我的成绩" hasShadow dispatch={dispatch} />
      <div >
        <WhiteSpace />
        {listData.length > 0 ? listData.map(item => achievementRow(item, handlerChangeRouteClick.bind(null, 'achievementdetails', { courseid: item.id }, dispatch))) :
          <NoContent />}
      </div >
    </div >
  );
}

export default connect(({ loading, achievement }) => ({
  loading,
  achievement,
}))(Achievement);

import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon, List } from 'components';
import { getLocalIcon } from 'utils';
import Refresh from 'components/pulltorefresh';
import Nav from 'components/nav';
import { groupRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'group';


function Group ({ location, dispatch, group }) {
  const { name = '我的小组' } = location.query,
    { listData, refreshing, scrollerTop } = group;
  const onRefresh = () => {

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
    <div >
      <Nav title={name} hasShadow dispatch={dispatch} />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]} >
        <Refresh
          refreshing={refreshing}
          onRefresh={onRefresh}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        >
          {cnIsArray(listData) && listData.map((item) => {
            return groupRow(item, handlerChangeRouteClick.bind(null, 'groupdetails', {
              name: '小组成员',
              courseid: item.courseid,
            }, dispatch));
          })}
        </Refresh >
      </div >
    </div >
  );
}

export default connect(({ loading, group }) => ({
  loading,
  group,
}))(Group);

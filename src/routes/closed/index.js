import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Refresh from 'components/pulltorefresh';
import Nav from 'components/nav';
import { closeLessonRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'closed';

function Closed ({ location, dispatch, closed }) {
  const { list, refreshing } = closed,
    onRefresh = () => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          refreshing: true,
        },
      });
      dispatch({
        type: `${PrefixCls}/queryList`,
      });
    };

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title="已开课程" isGoBack={false} hasShadow />
      <div>
        <WhiteSpace />
        <Refresh refreshing={refreshing} onRefresh={onRefresh}>
          {cnIsArray(list) && list.map((item) => {
            return closeLessonRow(item);
          })}
        </Refresh>
      </div>
    </div>
  );
}

export default connect(({ loading, closed }) => ({
  loading,
  closed,
}))(Closed);

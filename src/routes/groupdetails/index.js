import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { groupListRow } from 'components/row';
import ListView from 'components/listview';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'groupdetails';


function GroupDetails ({ location, dispatch, groupdetails }) {
  const { name = '小组详情' } = location.query,
    { listData, paginations, scrollerTop } = groupdetails,
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
          isRefresh: true,
        },
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
        },
      });
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
    },
    getContents = (lists) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView
          layoutHeader={''}
          dataSource={lists}
          layoutRow={(rowData, sectionID, rowID) => {
            return groupListRow(rowData, sectionID, rowID, handlerChangeRouteClick, dispatch, name);
          }}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />,
      );

      return result;
    };
  return (
    <div>
      <Nav title={name} hasShadow dispatch={dispatch} />
      <WhiteSpace />
      {listData.length > 0 ? getContents(listData) : ''}
    </div>
  );
}

export default connect(({ loading, groupdetails }) => ({
  loading,
  groupdetails,
}))(GroupDetails);

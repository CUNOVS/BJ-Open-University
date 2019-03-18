import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { groupListRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'groupdetails';


function GroupDetails ({ location, dispatch, groupdetails }) {
  const { name = '小组详情' } = location.query,
    { listData } = groupdetails;
  const { BaseLine } = Layout;

  return (
    <div>
      <Nav title={name} hasShadow dispatch={dispatch} />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]}>
        {groupListRow(handlerChangeRouteClick.bind(null, 'userpage', { name: '已开课程' }, dispatch))}
      </div>

    </div>
  );
}

export default connect(({ loading, groupdetails }) => ({
  loading,
  groupdetails,
}))(GroupDetails);

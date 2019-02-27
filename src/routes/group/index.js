import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { groupRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'group';


function Group ({ location, dispatch, group }) {
  const { name = '我的小组' } = location.query,
    { listData } = group;
  const { BaseLine } = Layout;

  return (
    <div>
      <Nav title={name} hasShadow={true} dispatch={dispatch} />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]}>
        {groupRow(handlerChangeRouteClick.bind(null, 'groupdetails', { name: '小组详情' }, dispatch))}
      </div>

    </div>
  );
}

export default connect(({ loading, group }) => ({
  loading,
  group,
}))(Group);

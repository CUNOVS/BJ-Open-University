import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Refresh from 'components/pulltorefresh';
import Nav from 'components/nav';
import { groupRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'group';


function Group ({ location, dispatch, group, app }) {
  const { name = '我的小组' } = location.query,
    { listData, refreshing } = group;
  const onRefresh = () => {

  };
  return (
    <div>
      <Nav title={name} hasShadow dispatch={dispatch} />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]}>
        <Refresh refreshing={refreshing} onRefresh={onRefresh}>
          {cnIsArray(listData) && listData.map((item) => {
            return groupRow(item, handlerChangeRouteClick.bind(null, 'groupdetails', {
              name: '小组成员',
              courseid: item.courseid,
            }, dispatch));
          })}
        </Refresh>
      </div>

    </div>
  );
}

export default connect(({ loading, group, app }) => ({
  loading,
  group,
  app,
}))(Group);

import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { teachersRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'teachers';

function Teachers ({ location, dispatch, teachers }) {
  const { name = '分类' } = location.query;

  return (
    <div>
      <Nav title="我的老师" hasShadow dispatch={dispatch} />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]}>
        {teachersRow(handlerChangeRouteClick.bind(null, 'building', { name: '正在建设中' }, dispatch))}
      </div>

    </div>
  );
}

export default connect(({ loading, teachers }) => ({
  loading,
  teachers,
}))(Teachers);

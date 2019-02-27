import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { openingLessonRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'opening';


function Opening ({ location, dispatch, opening }) {
  const { name = '分类' } = location.query,
    { listData } = opening;
  const { BaseLine } = Layout;

  return (
    <div>
      <Nav title="在开课程" isGoBack={false} hasShadow={true} />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]}>
        {openingLessonRow(handlerChangeRouteClick.bind(null, 'lessondetails', { name : '已开课程' }, dispatch),handlerChangeRouteClick.bind(null, 'achievementdetails', { name : '' }, dispatch))}
      </div>

    </div>
  );
}

export default connect(({ loading, opening }) => ({
  loading,
  opening,
}))(Opening);

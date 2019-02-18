import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { handleLessonClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'opening';


function Opening ({ location, dispatch, opening }) {
  const { name = '分类' } = location.query,
    { listData } = opening;
  const { BaseLine } = Layout;

  return (
    <div>
      <Nav title="在开课程" isGoBack={false} hasShadow={true} />
      <div className={styles[`${PrefixCls}-order`]}>
      </div>

    </div>
  );
}

export default connect(({ loading, opening }) => ({
  loading,
  opening,
}))(Opening);

import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Refresh from 'components/pulltorefresh';
import Nav from 'components/nav';
import { openingLessonRow } from 'components/row';
import { handlerLessonListClick, handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'opening';

function Opening ({ location, dispatch, opening }) {
  const { name = '在开课程' } = location.query,
    { list, refreshing } = opening,
    { BaseLine } = Layout,
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
    <div>
      <Nav title={name} isGoBack={false} hasShadow />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]}>
        <Refresh refreshing={refreshing} onRefresh={onRefresh}>
          {cnIsArray(list) && list.map((item) => {
            return openingLessonRow(item, handlerLessonListClick,
              handlerChangeRouteClick.bind(null, 'achievementdetails', {
                name: item.name,
                courseid: item.id,
                grade: item.graderaw,
              }, dispatch), dispatch);
          })}
        </Refresh>
      </div>
    </div>
  );
}

export default connect(({ loading, opening }) => ({
  loading,
  opening,
}))(Opening);

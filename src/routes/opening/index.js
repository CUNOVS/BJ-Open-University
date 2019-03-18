import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { openingLessonRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'opening';
const data = [
  {
    title: '3-6岁儿童学习与发展',
    teacher: '彭海蕾',
    grade: 40,
    endDate: '4月31日',
    isEnding: 1,
    isAttendance: 1,
    image: require('../../themes/images/linshi/child.png'),
  },
  {
    title: '北京历史文化',
    teacher: '马冬梅',
    grade: 66,
    endDate: '3月31日',
    isEnding: 0,
    isAttendance: 1,
    image: require('../../themes/images/linshi/beijing.png'),
  },
  {
    title: '大学英语（2）',
    teacher: '邓爱珍',
    grade: 98,
    endDate: '3月20日',
    isEnding: 1,
    isAttendance: 0,
    image: require('../../themes/images/linshi/english.png'),
  },
];

function Opening ({ location, dispatch, opening }) {
  const { name = '分类' } = location.query,
    { listData } = opening;
  const { BaseLine } = Layout;

  return (
    <div>
      <Nav title="在开课程" isGoBack={false} hasShadow />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]}>
        {cnIsArray(data) && data.map((item, i) => {
          return openingLessonRow(item, handlerChangeRouteClick.bind(null, 'lessondetails', { name: '已开课程' }, dispatch), handlerChangeRouteClick.bind(null, 'achievementdetails', { name: '' }, dispatch));
        })}
      </div>

    </div>
  );
}

export default connect(({ loading, opening }) => ({
  loading,
  opening,
}))(Opening);

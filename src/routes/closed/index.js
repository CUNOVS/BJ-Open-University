import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { closeLessonRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'closed';
const data = [
  {
    title: 'EM1C002 特许经营导论',
    teacher: '李刚',
    attendance: 1,
    grade: 88.56,
    image: require('../../themes/images/linshi/txjy.png'),
  },
  {
    title: '中级汉语综合课',
    teacher: '阎亚矛',
    attendance: 0,
    grade: 58,
    image: require('../../themes/images/linshi/chinese.png'),
  },
  {
    title: '财务经理的财务课',
    teacher: '段娟',
    attendance: 1,
    grade: 98.56,
    image: require('../../themes/images/linshi/caiwu.png'),
  },
];

function Closed ({ location, dispatch, closed }) {
  const { listData } = closed;

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title="已开课程" isGoBack={false} hasShadow />
      <div>
        <WhiteSpace />
        {cnIsArray(data) && data.map((item, i) => {
          return closeLessonRow(item, handlerChangeRouteClick.bind(null, 'openDetails', { name: '已开课程' }, dispatch));
        })}
      </div>
    </div>
  );
}

export default connect(({ loading, closed }) => ({
  loading,
  closed,
}))(Closed);

import React from 'react';
import Rate from 'rc-rate';
import { routerRedux } from 'dva/router';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import '../../../node_modules/rc-rate/assets/index.css';
import styles from './index.less';

const PrefixCls = 'lessongrade';
const LessonGrade = (props) => {
  const handleClick = () => {
    props.dispatch(
      routerRedux.push({
        pathname: '/gradedetails',
      }));
  };
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <div className={styles[`${PrefixCls}-title`]}>jQuery基础课程</div>
      <div className={styles[`${PrefixCls}-rate`]} onClick={handleClick}>
        <div className={styles[`${PrefixCls}-rate-left`]}>
          <div className={styles[`${PrefixCls}-rate-title`]}>综合得分 <span style={{ color: '#ffaf0d' }}>1</span></div>
          <Rate style={{ fontSize: '25px' }} disabled defaultValue={1} />
        </div>
        <div>
          <Icon type="right" color="#666" />
        </div>
      </div>
    </div>
  );
};
export default LessonGrade;

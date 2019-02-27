import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import AttendanceHead from 'components/attendancehead';
import WeekBox from 'components/weekbox';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'attendancedetails';


function AttendanceDetails ({ location, dispatch, attendancedetails }) {
  const { name = '考勤详情' } = location.query,
    { listData } = attendancedetails;
  const { BaseLine } = Layout;

  return (
    <div>
      <Nav title={name} hasShadow={true} dispatch={dispatch} />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]}>
        <AttendanceHead />
        <WeekBox />
      </div>

    </div>
  );
}

export default connect(({ loading, attendancedetails }) => ({
  loading,
  attendancedetails,
}))(AttendanceDetails);

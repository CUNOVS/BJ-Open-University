import { connect } from 'dva';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { attendanceRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'attendance';


function Attendance ({ location, dispatch, attendance }) {
  const { name = '我的考勤' } = location.query,
    { listData } = attendance;
  const { BaseLine } = Layout;

  return (
    <div>
      <Nav title={name} hasShadow dispatch={dispatch} />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]}>
        {attendanceRow(handlerChangeRouteClick.bind(null, 'attendancedetails', { name: '考勤详情' }, dispatch))}
      </div>

    </div>
  );
}

export default connect(({ loading, attendance }) => ({
  loading,
  attendance,
}))(Attendance);

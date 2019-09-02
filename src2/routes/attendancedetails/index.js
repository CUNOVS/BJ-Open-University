import React from 'react';
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
  const { name = '考勤详情', fullname = '', startdate, enddate } = location.query,
    { data } = attendancedetails;
  const headProps = {
    fullname,
    startdate,
    enddate,
    attendance: data
  };
  return (
    <div >
      <Nav title={name} hasShadow dispatch={dispatch} />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]} >
        <AttendanceHead {...headProps} />
        <WeekBox attendance={data} />
      </div >
    </div >
  );
}

export default connect(({ loading, attendancedetails }) => ({
  loading,
  attendancedetails,
}))(AttendanceDetails);

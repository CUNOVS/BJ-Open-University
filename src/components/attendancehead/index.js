import React from 'react';
import PropTypes from 'prop-types';
import { changeLessonDate } from 'utils';
import styles from './index.less';
import Huise from './huise.png';

const PrefixCls = 'DaiJianTou';
const data = {
  title: '3-6岁儿童学习与发展',
  time: '2018.9.18至2019.1.26',
  class: '3天/周',
  total: '4周',
  achievement: '0',
  qualified: '达标'
};

class AttendanceHead extends React.Component {
  constructor (props) {
    super(props);
  }

  getPassedNum = (arr) => arr.filter(item => item.stat === 1).length;

  render () {
    const { fullname, startdate, enddate, attendance } = this.props,
      { day_pass = '', weeks = '', passed_weeks = [] } = attendance;
    return (
      <div >
        <div className={styles[`${PrefixCls}-population`]} >
          <div className={styles[`${PrefixCls}-population-title`]} >{fullname}</div >
          <div className={styles[`${PrefixCls}-population-content`]} >
            <div className={styles[`${PrefixCls}-population-content-left`]} >
              <div >开课时间:{`${changeLessonDate(startdate)}-${changeLessonDate(enddate)}`}</div >
              <div >{`周全勤天数要求:${day_pass}次/周`}</div >
              <div >实际教学周数:{weeks}</div >
            </div >
            <div className={styles[`${PrefixCls}-population-content-right`]} >
              <div style={{ backgroundImage: `url(${Huise})` }}
                   className={styles[`${PrefixCls}-population-content-right-imag`]} >
                <div className={styles[`${PrefixCls}-population-content-right-imag-content`]} >
                  <div style={{ fontSize: '0.6rem' }} >{data.achievement}</div >
                  <div style={{ paddingTop: '0rem' }} >{data.qualified}</div >
                </div >
              </div >
              <div className={styles[`${PrefixCls}-population-content-right-imag-tips`]} >
                {`累计未达标周次${this.getPassedNum(passed_weeks)}`}
              </div >
            </div >
          </div >
        </div >
        <div className={styles[`${PrefixCls}-disan`]} />
      </div >
    );
  }
}

export default AttendanceHead;

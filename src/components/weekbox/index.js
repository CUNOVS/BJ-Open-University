import React from 'react';
import { Icon, WhiteSpace } from 'components';
import { getLocalIcon } from 'utils';
import CnBadge from 'components/cnBadge';
import styles from './index.less';

const PrefixCls = 'weekbox',
  grid = [
    { day1: 0 },
    { day2: 0 },
    { day3: 0 },
    { day4: 0 },
    { day5: 0 },
    { day6: 0 },
    { day7: 0 },
  ];

const getGrid = (obj) => {
  const arr = [];
  Object.keys(obj)
    .map((items, i) => {
      let o = {};
      o[items] = obj[items];
      arr.push(o);
    });
  return arr;
};

const getWeekAttendance = (obj) => {
  let num = 0;
  Object.keys(obj)
    .map((items) => {
      if (parseInt(obj[items], 10) === 1) {
        num += 1;
      }
    });
  return num;
};

class WeekBox extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { attendance } = this.props,
      { current_week: currentData, weekStat, passed_weeks: passedWeeks } = attendance;
    return (
      <div >
        {
          1 ?
            <div className={styles[`${PrefixCls}-population`]} >
              <div className={styles[`${PrefixCls}-firstLine`]} >
                <div className={styles[`${PrefixCls}-firstLine-title`]} >
                  <span ><Icon type={getLocalIcon('/components/attendance.svg')} color="#22609c" /></span >
                  <span > 当前周</span >
                </div >
              </div >
              <div style={{ paddingBottom: '0.2rem' }} >
                <div className={styles[`${PrefixCls}-week`]} >
                  {grid.map((data, index) => (
                    <div key={index} className={styles[`${PrefixCls}-week-div`]} >
                      {['一', '二', '三', '四', '五', '六', '日'][index]}
                    </div >
                  ))}
                </div >
                <div className={styles[`${PrefixCls}-week`]} >
                  {getGrid(Object.assign(...grid, currentData))
                    .map((data, index) => (
                      <div key={index} className={styles[`${PrefixCls}-week-divII`]} >
                        {data[`day${index + 1}`]}
                      </div >
                    ))}
                </div >
              </div >
              <div className={styles[`${PrefixCls}-bottom`]} >
                <div >
                  {`周出勤天数:${getWeekAttendance(currentData)}`}
                </div >
                <CnBadge
                  text={weekStat ? '达标' : '未达标'}
                  background={weekStat ? '#1eb259' : '#f34e14'}
                  color="#fff"
                  size="normal"
                />
              </div >
            </div >
            :
            null
        }
        {cnIsArray(passedWeeks) && passedWeeks.map((item, i) => (
          <div key={i} >
            <WhiteSpace />
            <div className={styles[`${PrefixCls}-population`]} >
              <div className={styles[`${PrefixCls}-firstLine`]} >
                <div className={styles[`${PrefixCls}-firstLine-title`]} >
                  <span ><Icon type={getLocalIcon('/components/attendance.svg')} color="#22609c" /></span >
                  <span > {`第${item.slot}周`}</span >
                </div >
                <CnBadge
                  text={item.stat ? '达标' : '未达标'}
                  background={item.stat ? '#1eb259' : '#f34e14'}
                  color="#fff"
                  size="normal"
                />
              </div >

            </div >
          </div >
        ))}
      </div >
    );
  }
}

export default WeekBox;

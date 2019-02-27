import React from 'react';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import Stauts from 'components/status';
import styles from './index.less';

const PrefixCls = 'weekbox',
  grid = [
    { text: '一', num: '1' },
    { text: '二', num: '2' },
    { text: '三', num: '0' },
    { text: '四', num: '0' },
    { text: '五', num: '0' },
    { text: '六', num: '0' },
    { text: '日', num: '1' },
  ];

class WeekBox extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className={styles[`${PrefixCls}-population`]}>
        <div className={styles[`${PrefixCls}-firstLine`]}>
          <div className={styles[`${PrefixCls}-firstLine-title`]}>
            <span><Icon type={getLocalIcon('/components/attendance.svg')} color='#22609c' /></span>
            <span> 第一周</span>
          </div>
          <div className={styles[`${PrefixCls}-firstLine-time`]}>2018.9.18至2018.9.25</div>
        </div>
        <div style={{ paddingBottom: '0.2rem' }}>
          <div className={styles[`${PrefixCls}-week`]}>
            {grid.map((data, index) => (
              <div className={styles[`${PrefixCls}-week-div`]}>
                {data.text}
              </div>
            ))}
          </div>
          <div className={styles[`${PrefixCls}-week`]}>
            {grid.map((data, index) => (
              <div className={styles[`${PrefixCls}-week-divII`]}>
                {data.num}
              </div>
            ))}
          </div>
        </div>
        <div className={styles[`${PrefixCls}-bottom`]}>
          <div>周出勤天数:4</div>
          <Stauts content='已达标' />
        </div>
      </div>
    );
  }
}

export default WeekBox;

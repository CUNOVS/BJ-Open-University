/**
 * @author Lowkey
 * @date 2019/02/14 17:19:26
 * @Description:
 */
import React from 'react';
import { DateChange, getLocalIcon } from 'utils';
import styles from './index.less';
import { Icon } from 'antd-mobile';

const PrefixCls = 'timeline';

const TimeLine = () => {
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <div className={styles[`${PrefixCls}-outer-icon`]}>
        <Icon type={getLocalIcon('/dashboard/calendar.svg')} color="#22609c" />
      </div>
      <div className={styles[`${PrefixCls}-outer-time`]}>
        {DateChange()}
      </div>
    </div>
  );
};
export default TimeLine;

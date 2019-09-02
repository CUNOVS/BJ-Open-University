/**
 * @author Lowkey
 * @date 2019/02/26 11:00:46
 * @Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import CnBadge from 'components/cnBadge';
import styles from './index.less';

const PrefixCls = 'photobox';

const PhotoBox = (props) => (
  <div >
    <div className={styles[`${PrefixCls}-outer`]} style={{ backgroundImage: `url(${props.bg})` }} >
      <div className={styles[`${PrefixCls}-teacher`]} >
        {props.tutor.length > 0 ?
          props.tutor.slice(0, 2)
            .map(item => (
              <span
                key={item.id}
                className={styles[`${PrefixCls}-tutorteacher`]}
                onClick={props.handlerChartClick.bind(null, 'conversation', {
                  fromuserid: item.id,
                  name: item.userData.fullname,
                }, props.dispatch)}
              >
      辅导教师：{item.userData.fullname || ''}
            </span >
            )) : null}
        {props.master.length > 0 ?
          <span
            key={props.master[0].id}
            className={styles[`${PrefixCls}-masterteacher`]}
            onClick={props.handlerChartClick.bind(null, 'conversation', {
              fromuserid: props.master[0].id,
              name: props.master[0].fullname
            }, props.dispatch)}
          >
      责任教师：{props.master[0].fullname || ''}
        </span > :
          null}
      </div >
    </div >
    {props.hasAttendance && props.daypass !== '0' ?
      <div className={styles[`${PrefixCls}-attendance-outer`]} >
        <div className={styles[`${PrefixCls}-attendance`]} onClick={props.attendanceClick} >
          <div className={styles[`${PrefixCls}-attendance-info`]} >
            <Icon type={getLocalIcon('/components/attendance.svg')} size="xs" color="#22609c" />
            <span >本周考勤</span >
          </div >
          <CnBadge
            text={props.weekStat ? '达标' : '未达标'}
            background={props.weekStat ? '#1eb259' : '#f34e14'}
            color="#fff"
          />
        </div >
      </div >
      :
      null
    }
  </div >
);
PhotoBox.PropTypes = {
  bg: PropTypes.string.isRequired,
  tutor: PropTypes.string.isRequired,
  master: PropTypes.string.isRequired,
  weekStat: 0
};

PhotoBox.defaultProps = {
  tutor: [],
  master: [],
  hasAttendance: true,
  attendanceClick: null,
  handlerChartClick: null
};
export default PhotoBox;

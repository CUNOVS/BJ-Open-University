import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import Status from 'components/status';

const PrefixCls = 'photobox';

const PhotoBox = (props) => (
  <div className={styles[`${PrefixCls}-outer`]} style={{ backgroundImage: `url(${props.bg})` }}>
    <div className={styles[`${PrefixCls}-teacher`]}>
      <span className={styles[`${PrefixCls}-tutorteacher`]}>
      辅导教师：{`${props.tutor}`}
    </span>
      <span className={styles[`${PrefixCls}-masterteacher`]}>
      责任教师：{`${props.master}`}
    </span>
    </div>
    {props.hasAttendance ?
      <div className={styles[`${PrefixCls}-attendance`]}>
        <div className={styles[`${PrefixCls}-attendance-info`]}>
          <span><Icon type={getLocalIcon('/components/attendance.svg')} color='#22609c' /></span>
          <span>我的考勤</span>
        </div>
        <Status content='达标'/>
      </div>
      :
      ''
    }
  </div>
);
PhotoBox.PropTypes = {
  bg: PropTypes.string.isRequired,
  tutor: PropTypes.string.isRequired,
  master: PropTypes.string.isRequired,
};

PhotoBox.defaultProps = {
  tutor: '匿名',
  master: '匿名',
  hasAttendance: true,
  status: '未知',
};
export default PhotoBox;

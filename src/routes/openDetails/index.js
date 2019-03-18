import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Icon } from 'components';
import ReactDOM from 'react-dom';
import Status from 'components/status';
import styles from './index.less';
import Cengji from './cengji.png';
import Dianzan from './dianzan.png';
import Damuzhi from './damuzhi.svg';
import pic from './pic.jpg';
import { getLocalIcon, getOffsetTopByBody } from 'utils';
import Photobox from 'components/photobox';
import Photoheader from 'components/photoheader';


const PrefixCls = 'openDetails';
const data = {
  information: 'EM1C002 特许经营导论',
  label: '已结束',
  fraction: '90',
  achievement: '0',
  time: '1',
};

class OpenDetails extends React.Component {
  constructor (props) {
    super(props);
  }


  render () {
    return (
      <div style={{ height: '100vh', background: 'white' }}>
        <Photoheader dispatch={this.props.dispatch} />
        <Photobox hasAttendance={false} tutor="刘月玥" master="赵杨" bg={pic} />
        <div ref={el => this.lv = el} className={styles[`${PrefixCls}-noticeBar`]}>
          <div className={styles[`${PrefixCls}-noticeBar-info`]}>
            <span><Icon type={getLocalIcon('/components/book.svg')} /></span>
            <span>{data.information}</span>
          </div>
          <Status content="已结束" status={0} />
        </div>
        <div className={styles[`${PrefixCls}-population`]}>
          <div style={{ backgroundImage: `url(${Cengji})` }} className={styles[`${PrefixCls}-population-achievement`]}>
            <div className={styles[`${PrefixCls}-population-achievement-content`]}>
              <div>成绩</div>
              <div>{data.fraction}</div>
              <div>{data.achievement == '1' ? '不合格' : '合格'}</div>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${Dianzan})` }} className={styles[`${PrefixCls}-population-achievement`]}>
            <div className={styles[`${PrefixCls}-population-achievement-content`]}>
              <div>考勤</div>
              <img src={Damuzhi} />
              <div>{data.time == '1' ? '不合格' : '合格'}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ openDetails }) => ({
  openDetails,
}))(OpenDetails);

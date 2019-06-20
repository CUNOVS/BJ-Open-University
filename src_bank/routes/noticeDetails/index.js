import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { NoticeBar, List, Badge, SegmentedControl, ListView, NavBar, Icon, Button } from 'antd-mobile';
import TitleBox from 'components/titlecontainer';
import styles from './index.less';

const PrefixCls = 'ceyan';


class NoticeDetails extends React.Component {
  constructor (props) {
    super(props);
  }  
    
  render () {
    	const { name = '' } = this.props.location.query,
    		{ data, content } = this.props.noticeDetails;
    return (
      <div style={{ height: '100vh', background: 'white' }}>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-top`]}>
          <div className={styles[`${PrefixCls}-top-head`]}>{content.title}</div>
          <Badge text={content.type} />
          <div className={styles[`${PrefixCls}-top-jinxing`]}>
            <span>{content.week}</span>
            <span>{content.complete}</span>
          </div>
          <div>测验描述:		{content.describe}</div>
          <div>已提交{content.time}</div>
          <div>最终测试得分:		{content.achievement}</div> 					
        </div>
        <div style={{ background: 'white' }}>		
          <TitleBox title="课程简介" sup="" />
          {data.map((data, index) => (
            <div className={styles[`${PrefixCls}-content`]}>
              <div className={styles[`${PrefixCls}-content-one`]}>
                <div>
                  <div>状态:		完成</div>
                  <div>成绩3</div>
                </div>
                <div>提交时间:		2019年1月2日17:00</div>
              </div>
              <Icon type="right" style={{ flex: '10%' }} />
            </div>							
          ))}
        </div>
      </div>
    );
  }
}


export default connect(({ noticeDetails }) => ({
  noticeDetails
}))(NoticeDetails);

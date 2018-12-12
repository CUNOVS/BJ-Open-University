import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Dialogue from 'components/discuss/dialogue';
import styles from './index.less';
import { Modal, Icon } from 'components';
import { getImages, getLocalIcon, getErrorImg } from 'utils';
import InnerHtml from 'components/innerhtml';

const PrefixCls = 'lessondetails';

class NoticeDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      yep: 'none',
      yes: true,
      yesO: true,
      zan: 9,
      ping: 2,
    };
  }

  ClickT = () => {
    if (this.state.yes) {
      this.setState({
        yes: !this.state.yes,
        yep: 'block',
      });
    } else {
      this.setState({
        yes: !this.state.yes,
        yep: 'none',
      });
    }
  };

  ClickO = () => {
    if (this.state.yesO) {
      this.setState({
        zan: this.state.zan + 1,
        yesO: !this.state.yesO,
      });
    } else {
      this.setState({
        zan: this.state.zan - 1,
        yesO: !this.state.yesO,
      });
    }
  };

  render () {
    const { name = '' } = this.props.location.query,
      { currentComments, head, concent, foot } = this.props.noticedetails;
    return (
      <div className={styles[`${PrefixCls}-sun`]}>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-sun-div1`]}>
          <div className={styles[`${PrefixCls}-sun-div1-div1`]}>
            <img src={head.images} />
          </div>
          <div className={styles[`${PrefixCls}-sun-div1-div2`]}>
            <span>{head.head}</span>
            <br />
            <span>{head.conect}</span>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-sun-divZ`]}>
          编辑于 : {head.date}
        </div>
        <div className={styles[`${PrefixCls}-sun-div2`]}>
          <InnerHtml data={concent} />
        </div>
        <div className={styles[`${PrefixCls}-sun-div3`]}>
          <div style={{ flex: '2' }} onClick={this.ClickO}>
            <div className={styles[`${PrefixCls}-sun-div3-divS`]}>
              <Icon type={getLocalIcon('/buttons/praise.svg')} />
              赞同 {this.state.zan}
            </div>
          </div>
          <div style={{ flex: '5' }} onClick={this.ClickT}>
            <div className={styles[`${PrefixCls}-sun-div3-divS`]}>
              <Icon type={getLocalIcon('/buttons/reply.svg')} />
              {this.state.ping} 条评论
            </div>
          </div>
        </div>
        <div style={{ display: `${this.state.yep}` }}>
          <div
            style={{ borderTop: 'solid 1px #ddd', fontSize: '0.33rem', fontWeight: '600', padding: '0.37rem 0.3rem' }}>
            {this.state.ping} 条评论
          </div>
          {currentComments && currentComments.map((data, i) => (
            <Dialogue key={i} {...data} dispatch={this.props.dispatch} />
          ))}
        </div>
      </div>
    );
  }
}


export default connect(({ noticedetails }) => ({
  noticedetails,
}))(NoticeDetails);

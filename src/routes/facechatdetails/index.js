/**
 * @author Lowkey
 * @date 2018/11/14 14:27:40
 * @Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import TransparentHeader from 'components/transparentheader';
import Tag from 'components/tag';
import Card from 'components/card';
import Notice from 'components/notice';
import TitleBox from 'components/titlecontainer';
import { getOffsetTopByBody } from 'utils';
import { connect } from 'dva';
import styles from './index.less';

const PrefixCls = 'facechatdetails';

class FaceChatDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      offset: 0,
    };
  }

  componentDidMount () {
    const element = ReactDOM.findDOMNode(this.offset);
    this.setState({
      offset: getOffsetTopByBody(element),
    });
  }

  handlerNoticeClick = (dispatch) => {
    dispatch(routerRedux.push({
      pathname: 'noticelist',
      query: {
        name: '公告',
      },
    }));

  };
  handlerClick = (dispatch) => {
    dispatch(routerRedux.push({
      pathname: 'noticedetails',
      query: {
        name: '详情',
      },
    }));

  };

  render () {
    const { name = '' } = this.props.location.query,
      { data, card } = this.props.facechatdetails;
    return (
      <div>
        <TransparentHeader name={name} dispatch={this.props.dispatch} offset={this.state.offset} />
        <div className={styles[`${PrefixCls}-head`]}>
          <div className={styles[`${PrefixCls}-back`]} style={{ backgroundImage: `url(${data.img})` }} />
          <div className={styles[`${PrefixCls}-back-content`]}>
            <div>
              <div className={styles[`${PrefixCls}-back-content-title`]}>
                {data.title}
              </div>
              <div className={styles[`${PrefixCls}-back-content-founder`]}>
                {`创建人:${data.founder}`}
              </div>
            </div>
            <div className={styles[`${PrefixCls}-back-content-tags`]}>
              {
                cnIsArray(data.tags) && data.tags.map((data, i) => <Tag key={i} title={data.title} />)
              }
            </div>
          </div>
        </div>
        <Notice handlerClick={this.handlerNoticeClick.bind(this, this.props.dispatch)} />
        <div ref={el => this.offset = el}>
          <TitleBox title="最新动态" sup='' />
        </div>
        <div className={styles[`${PrefixCls}-discuss`]}>
          {cnIsArray(card) && card.map(data => <Card {...data} handlerClick={this.handlerClick.bind(this,this.props.dispatch)} />)}
        </div>
      </div>
    );
  }
}

export default connect(({ facechatdetails }) => ({
  facechatdetails,
}))(FaceChatDetails);

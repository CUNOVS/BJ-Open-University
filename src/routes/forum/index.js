import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Badge, Icon, List } from 'antd-mobile';
import InnerHtml from 'components/innerhtml';
import CnBadge from 'components/cnBadge';
import { getImages } from 'utils';
import styles from './index.less';
import { forum } from 'components/row';
import ReactDOM from 'react-dom';
import { routerRedux } from 'dva/router';

const PrefixCls = 'forum',
  Item = List.Item;
const data = [
  {
    stick: '置顶',
    title: '评价幼儿健康成长状况',
    number: '2',
    name: '刘静',
    time: '2018年10月10日 星期三 14:39',
    sun: '2',
    class: '16、17级学前高起本班',
  },
];

class Forum extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  componentDidMount () {
    const currentHeight = window.innerHeight,
      currentTop = ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({
      height: currentHeight - currentTop,
    });
  }

  Click = ({ title = '刘静' }, pathname) => {
    this.props.dispatch(routerRedux.push({
      pathname: `/${pathname}`,
      query: {
        name: title,
      },
    }));
  };

  render () {
    const { name } = this.props.location.query;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-head`]}>
          <div>
            学习活动1.1：评价幼儿健康成长状况
          </div>
          <div className={styles[`${PrefixCls}-head-bottom`]}>
            <div>总分:3</div>
            <CnBadge text="考勤活动" background="#ff911b" color="#fff" />
          </div>
          <div>
            <InnerHtml
              data='<div><span style="line-height: 1.231; font-family: 微软雅黑; color: #000000; font-size: small;">《&lt;3-6岁儿童学习与发展指南&gt;之健康领域的目标及要求》带领大家学习了《指南》中3-6岁儿童健康成长的标准。</span></div>' />
          </div>
        </div>

        <div style={{ height: this.state.height, background: 'white' }} ref={el => this.lv = el}>
          <div className={styles[`${PrefixCls}-title`]}>
            <div><Icon type='down' />话题(1)</div>
            <div style={{ color: '#1296db' }}>按用户查看帖子</div>
          </div>

          {forum(data, this.Click.bind(this, data, 'forumDetails'))}
        </div>
      </div>
    );
  }
}


export default connect(({ forum }) => ({
  forum,
}))(Forum);

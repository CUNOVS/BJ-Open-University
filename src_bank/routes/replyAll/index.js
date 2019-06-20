import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Badge, Icon, List } from 'antd-mobile';
import { getImages, getLocalIcon } from 'utils';
import styles from './index.less';
import { forum } from 'components/row';
import TitleBox from 'components/titlecontainer';
import ReactDOM from 'react-dom';
import { forumDetails } from 'components/row';
import huifu from './huifu.svg';

const PrefixCls = 'forumDetails',
  Item = List.Item;


class ReplyAll extends React.Component {
  render () {
    	const { data } = this.props.replyAll;
    return (
      <div style={{ height: '100vh', background: 'white' }}>
        <Nav title={name} dispatch={this.props.dispatch} />
        {forumDetails(data)}                
      </div>
    );
  }
}


export default connect(({ replyAll }) => ({
  replyAll
}))(ReplyAll);

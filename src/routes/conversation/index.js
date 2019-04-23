import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import ChatRoom from 'components/chatroom';
import styles from './index.less';


const PrefixCls = 'conversation';

const Conversation = ({ location, dispatch, conversation }) => {
  const { name } = location.query();
  return (
    <div>
      <Nav title={name} dispatch={dispatch} hasShadow />
      <ChatRoom />
    </div>
  );
};

Conversation.propTypes = {};
Conversation.defaultProps = {};
export default connect(({ loading, conversation }) => ({ loading, conversation }))(Conversation);

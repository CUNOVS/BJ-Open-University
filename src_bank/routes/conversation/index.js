import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import ChatRoom from 'components/chatroom';
import styles from './index.less';


const PrefixCls = 'conversation';

const Conversation = ({ location, dispatch, conversation, app }) => {

  const { name } = location.query;
  const { chartArr = [] } = conversation,
    { users: { userid, useravatar } } = app;
  const onSubmit = () => {

    },
    appendItems = (lists, id) => {
      const result = [];
      lists.map(list => {
        let isMySelf = list.hasOwnProperty('isMySelf') ? list.isMySelf : list.msgcUser == id;
        result.push({ ...list, isMySelf });
      });
      return result;
    },
    props = {
      handlerSubmit: onSubmit,
      dispatch,
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} hasShadow />
      <ChatRoom {...props} localArr={appendItems(chartArr, userid)} selfavatar={useravatar} />
    </div>
  );
};

Conversation.propTypes = {};
Conversation.defaultProps = {};
export default connect(({ loading, conversation, app }) => ({ loading, conversation, app }))(Conversation);

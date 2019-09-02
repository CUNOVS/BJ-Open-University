import React from 'react';
import Nav from 'components/nav';
import InnerHtml from 'components/innerhtml';
import { List, WhiteSpace } from 'components';
import { commentsRow } from 'components/row';
import { connect } from 'dva';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';

const Details = ({ location, dispatch, details, homework = {} }) => {
  const { name, type = '', content = '' } = location.query,
    getDefaultText = (arr) => {
      if (arr.find(item => item.type === 'onlinetext')) {
        return arr.find(item => item.type === 'onlinetext').editorfields[0].text;
      }
      return [];
    },
    getContent = () => {
      if (type === 'comments') {
        const { comments } = homework;
        return comments.map(item => (
          commentsRow(item, handlerChangeRouteClick, dispatch)
        ));
      } else if (type === 'onlineText') {
        const { data } = homework,
          { submitDataType = [] } = data;
        return <InnerHtml data={getDefaultText(submitDataType)} />;
      } else if (type === 'quizFeedback' || type === 'discription'||type === 'detailsText') {
        return <InnerHtml data={content} />;
      }
    };
  return (
    <div >
      <Nav title={name} dispatch={dispatch} />
      <div className={styles.outer} >
        {getContent()}
      </div >
    </div >
  );
};

Details.propTypes = {};
Details.defaultProps = {};
export default connect(({ loading, details, homework }) => ({ loading, details, homework }))(Details);

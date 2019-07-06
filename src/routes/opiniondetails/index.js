import React from 'react';
import Nav from 'components/nav';
import InnerHtml from 'components/innerhtml';
import { List, WhiteSpace } from 'components';
import { commentsRow } from 'components/row';
import { connect } from 'dva';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';

const OpinionDetails = ({ location, dispatch, opiniondetails, }) => {
  const { name, type = '', content = '' } = location.query
  return (
    <div >
      <Nav title={name} dispatch={dispatch} />
      <div className={styles.outer} >
        {getContent()}
      </div >
    </div >
  );
};

OpinionDetails.propTypes = {};
OpinionDetails.defaultProps = {};
export default connect(({ loading, opiniondetails, }) => ({ loading, opiniondetails, }))(OpinionDetails);

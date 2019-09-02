import React from 'react';
import Nav from 'components/nav';
import { List, WhiteSpace } from 'components';
import { commentsRow } from 'components/row';
import { connect } from 'dva';
import { getCommonDate } from 'utils';
import { handlerChangeRouteClick } from 'utils/commonevents';
import TitleBox from 'components/titlecontainer';
import styles from './index.less';

const OpinionDetails = ({ location, dispatch, opiniondetails, }) => {
  const { name } = location.query;
  const { detail } = opiniondetails;
  const { submitContent = '', submitDate = '', submitType = '', submitAnnex = '', baseHost = '', replyContent = '' } = detail;
  const getImages = () => {
    const arr = submitAnnex.split(',');
    if (cnIsArray(arr)) {
      return arr.map((item, i) => {
        return (
          <img key={i} src={`${baseHost}/${item}`} alt="" />
        );
      });
    }
  };
  return (
    <div >
      <Nav title={name} dispatch={dispatch} />
      <div className={styles.outer} >
        <div className={styles.info} >
          <span >{submitType}</span >
          <span >{getCommonDate(submitDate / 1000)}</span >
        </div >
        <div className={styles.content} >
          {submitContent}
        </div >
        <div className={styles.imgbox} >
          {getImages()}
        </div >
      </div >
      {
        replyContent && replyContent !== ''
          ?
          <div className={styles.reply} >
            <TitleBox title='回复' sup='' />
            <p >{replyContent}</p >
          </div >
          :
          null
      }
    </div >
  );
};

OpinionDetails.propTypes = {};
OpinionDetails.defaultProps = {};
export default connect(({ loading, opiniondetails, }) => ({ loading, opiniondetails, }))(OpinionDetails);

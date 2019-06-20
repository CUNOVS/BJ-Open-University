/**
 * @author Lowkey
 * @date 2019/04/02 14:39:52
 * @Description:
 */
import React from 'react';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';


const GradeBox = (props) => {
  const { isfinished, maxgrade, finalgrade, method, hasfeedback, feedbacktext, dispatch } = props;
  return (
    <div className={styles.grade} >
      <div className={styles.left} >
        <div className={styles.title} >{method}</div >
        <div className={styles.box} >
          {finalgrade ? <span >{`${finalgrade}分`}</span > : '未评分'}
          <span >{`共${maxgrade}`}</span >
        </div >
      </div >
      {
        hasfeedback ?
          <div
            className={styles.feedback}
            onClick={(e) => handlerChangeRouteClick(
              'details',
              {
                name: '总体反馈',
                type: 'quizFeedback',
                content: feedbacktext
              },
              dispatch,
              e)}
          >
            <Icon type={getLocalIcon('/components/feedback.svg')} size="lg" />
            <div >总体反馈</div >
          </div >
          :
          null
      }
    </div >
  );
};
export default GradeBox;

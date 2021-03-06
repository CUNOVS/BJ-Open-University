/**
 * @author Lowkey
 * @date 2019/04/02 14:39:52
 * @Description:
 */
import { Icon } from 'components';
import { getLocalIcon, getCommonData } from 'utils';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';

const getStatus = (type) => {
  const res = {
    inprogress: '进行中',
    finished: '完成',
    abandoned: '从未提交',
  };
  return res[type];
};
const Status = (props) => {
  const attempts = props.data,
    maxgrade = props.maxgrade;
  return (
    <div className={styles.status}>
      <div className={styles.title}>
        <span><Icon type="down" color="#22609c" /></span>
        <span>您上次答题的状态</span>
      </div>
      <div className={styles.box}>
        <div className={styles.header}>
          <div>序号</div>
          <div>状态</div>
          <div>{`成绩/${maxgrade}`}</div>
        </div>
        {cnIsArray(attempts) && attempts.map((item, i) => {
          return (
            <div
              key={i}
              className={styles.header}
              //   onClick={handlerChangeRouteClick.bind(null, 'quizReview', {
              //     attemptid: item.id,
              //   }, props.dispatch)}
            >
              <div>{item.attempt}</div>
              <div>
                <span>{getStatus(item.state)}</span>
                <span>{item.timefinish > 0 ? getCommonData(item.timefinish) : '-'}</span>
              </div>
              {item.state === 'finished' ? <div>{`${item.sumgrades}/${maxgrade}`}</div> : '未评分'}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Status;

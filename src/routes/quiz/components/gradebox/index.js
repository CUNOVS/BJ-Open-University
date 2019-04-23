/**
 * @author Lowkey
 * @date 2019/04/02 14:39:52
 * @Description:
 */
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import styles from './index.less';


const GradeBox = (props) => {
  const { isfinished, maxgrade, finalgrade, method } = props;
  return (
    <div className={styles.grade}>
      <div className={styles.left}>
        <div className={styles.title}>{method}</div>
        <div className={styles.box}>
          {finalgrade? <span>{`${finalgrade}分`}</span>:'未评分'}
          <span>{`共${maxgrade}`}</span>
        </div>
      </div>
      <div className={styles.feedback}>
        <Icon type={getLocalIcon('/components/feedback.svg')} size="lg" />
        <div>总体反馈</div>
      </div>
    </div>
  );
};
export default GradeBox;

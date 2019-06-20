/**
 * @author Lowkey
 * @date 2019/04/03 15:45:07
 * @Description:
 */
import { Icon } from 'components';
import { getLocalIcon, getCommonData } from 'utils';
import styles from './index.less';

const getIcon = (type) => {
  if (RegExp(/pdf/)
    .exec(type)) {
    return '/components/PDF.svg';
  } else if (RegExp(/docx/)
    .exec(type)) {
    return '/components/DOCX.svg';
  } else if (RegExp(/xlsb/)
    .exec(type)) {
    return '/components/EXCEL.svg';
  } else {
    return '/components/file.svg';
  }
};

const Enclosure = (props) => {
  const introattachments = props.data;
  return (
    <div>
      {cnIsArray(introattachments) &&
      introattachments.length > 0 &&
      introattachments.map((item, i) => {
        const { filename, timemodified } = item;
        return (
          <div key={i} className={styles.outer}>
            <div className={styles.img}>
              <Icon type={getLocalIcon(getIcon(filename))} size="lg" color="#22609c" />
            </div>
            <div className={styles.content}>
              <div className={styles.left}>
                <span>{filename}</span>
                <span>{getCommonData(timemodified)}</span>
              </div>
              <div className={styles.right}>
                下载
              </div>
            </div>
          </div>
        );
      })
      }
    </div>
  );
};
export default Enclosure;

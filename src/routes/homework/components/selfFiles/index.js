/**
 * @author Lowkey
 * @date 2019/04/03 15:45:07
 * @Description:
 */
import { Icon } from 'components';
import { getLocalIcon, getCommonData } from 'utils';
import Breviary from 'components/breviary';
import Enclosure from '../enclosure';
import styles from './index.less';


const SelfFiles = (props) => {
  const { data = [] } = props;
  const Result = data.slice(0, data.length - 1);
  return (
    <div className={styles.outer}>
      {Result && Result.map((item, i) => {
        return (
          <div>
            <h3>{item.name}</h3>
            {
              item.type === 'onlinetext'
                ?
                <Breviary data={item.editorfields[0].text} />
                :
                item.files.length > 0 ? <Enclosure data={item.files} /> : ''
            }
          </div>
        );
      })}
    </div>
  );
};
export default SelfFiles;

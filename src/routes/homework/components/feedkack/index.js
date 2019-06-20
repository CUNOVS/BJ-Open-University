/**
 * @author Lowkey
 * @date 2019/04/03 15:45:07
 * @Description:
 */
import { Icon } from 'components';
import { getLocalIcon, getCommonDate } from 'utils';
import Breviary from 'components/breviary';
import Enclosure from 'components/enclosure';
import styles from './index.less';
import InnerHtml from '../../../../components/innerhtml';


const FeedBack = (props) => {
  const { data = [] , fileIdPrefix} = props;
  return (
    <div className={styles.outer}>
      {data && data.map((item, i) => {
        return (
          <div key={i}>
            <h3>{item.name}</h3>
            {
              item.type === 'comments'
                ?
                <InnerHtml data={item.editorfields[0].text}/>
                :
                item.fileareas[0].files.length > 0 ? <Enclosure data={item.fileareas[0].files} fileIdPrefix={fileIdPrefix} /> : '未提交文件'
            }
          </div>
        );
      })}
    </div>
  );
};
export default FeedBack;

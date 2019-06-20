/**
 * @author Lowkey
 * @date 2019/04/03 15:45:07
 * @Description:
 */
import React from 'react';
import { Icon } from 'components';
import { getLocalIcon, getCommonDate } from 'utils';
import Breviary from 'components/breviary';
import Enclosure from 'components/enclosure';
import styles from './index.less';


const SelfFiles = (props) => {
  const { data , fileIdPrefix } = props;
  const Result = data.filter(item => item.type !== 'comments');
  return (
    <div className={styles.outer} >
      {Result && Result.map((item, i) => {
        return (
          <div key={i} >
            <h3 >{item.name}</h3 >
            {
              item.type === 'onlinetext'
                ?
                <Breviary data={item.editorfields[0].text} dispatch={props.dispatch} />
                :
                item.files && item.files.length > 0 ? <Enclosure data={item.files} fileIdPrefix={fileIdPrefix} /> : ''
            }
          </div >
        );
      })}
    </div >
  );
};
export default SelfFiles;

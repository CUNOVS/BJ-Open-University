/**
 * @author Lowkey
 * @date 2019/04/03 15:45:07
 * @Description:
 */
import React from 'react';
import { Icon } from 'components';
import { getLocalIcon, getCommonDate } from 'utils';
import TitleBox from 'components/titlecontainer';
import Enclosure from 'components/enclosure';
import InnerHtml from '../../../../components/innerhtml';
import styles from './index.less';


const FeedBack = (props) => {
  const { data = [], fileIdPrefix } = props;
  return (
    <div className={styles.outer} >
      {data && data.map((item, i) => {
        return (
          <div key={i} >
            <TitleBox title={item.name} sup="" />
            {
              item.type === 'comments'
                ?
                <InnerHtml data={item.editorfields[0].text} />
                :
                item.fileareas[0].files.length > 0 ?
                  <Enclosure data={item.fileareas[0].files} fileIdPrefix={fileIdPrefix} /> : ''
            }
          </div >
        );
      })}
    </div >
  );
};
export default FeedBack;

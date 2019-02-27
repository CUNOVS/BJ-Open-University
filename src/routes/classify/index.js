import { connect } from 'dva';
import { Modal, Tabs, WhiteSpace, Icon, List, Layout, SearchBar } from 'components';
import ClassifyItem from 'components/classify';
import { getLocalIcon } from 'utils';
import { commonRow } from 'components/row';
import { handleLessonClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'classify';


function Classify ({ location, dispatch, classify }) {
  const { name = '分类' } = location.query,
    { items, tabs, listData } = classify;
  const { BaseLine } = Layout;

  const getList = (listData) => {
    return (<List className={styles[`${PrefixCls}-list`]}>
      {
        listData && listData.map((data, i) => {
          return (
            commonRow(data, handleLessonClick.bind(null, dispatch))
          );
        })
      }
    </List>);
  };
  return (
    <div>
      <div className={styles[`${PrefixCls}-searchbox`]}>
        <SearchBar placeholder="搜索" maxLength={8} />
      </div>
      <div className={styles[`${PrefixCls}-content`]}>
        <div className={styles[`${PrefixCls}-title`]}>分类</div>
        <div className={styles[`${PrefixCls}-container`]}>
          {
            items && items.map((data, i) => {
              return <ClassifyItem key={i} items={data} />;
            })
          }
        </div>
      </div>

      <div className={styles[`${PrefixCls}-order`]}>
        <div className={styles[`${PrefixCls}-title`]} style={{ marginLeft: '10px' }}>子分类</div>
        <Tabs tabs={tabs} initialPage={2} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}>
          {getList(listData)}
        </Tabs>
        <BaseLine />
      </div>

    </div>
  );
}

export default connect(({ loading, classify }) => ({
  loading,
  classify,
}))(Classify);

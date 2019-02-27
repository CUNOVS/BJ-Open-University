import React from 'react';
import { connect } from 'dva';
import SelfHeader from 'components/selfheader';
import { WhiteSpace, List, Icon, Layout } from 'components';
import CarouselGrid from 'components/carouselgrid';
import TitleContainer from 'components/titlecontainer/index';
import { getLocalIcon } from 'utils';
import { rateRow } from 'components/row';
import { handleLessonClick, handleGridClick } from 'utils/commonevents';
import Rate from 'rc-rate';
import '../../../node_modules/rc-rate/assets/index.css';
import styles from './index.less';


const PrefixCls = 'studybase';

function StudyBase ({ location, dispatch, studyBase }) {
  const { name = '学习空间' } = location.query,
    { gridDatas, listData } = studyBase;
  const { BaseLine } = Layout;

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <div>
        <SelfHeader />
        <CarouselGrid datas={gridDatas} dispatch={dispatch} hasLine={false} isCarousel={false}
                      handleClick={handleGridClick} />
        <WhiteSpace size="xs" />
        <TitleContainer title="最近学习" />
        <List className={styles[`${PrefixCls}-list`]}>
          {
            listData && listData.map((data) => {
              return (
                rateRow(data, handleLessonClick.bind(null, dispatch))
              );
            })
          }
        </List>
      </div>
      <BaseLine />
    </div>
  );
}

export default connect(({ loading, studyBase }) => ({
  loading,
  studyBase,
}))(StudyBase);

/* eslint-disable one-var,one-var-declaration-per-line,import/first */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Layout, WhiteSpace, Icon, List } from 'components';
import styles from './index.less';
import { getLocalIcon, handleBuildingClick } from 'utils';
import Banner from 'components/banner/index';
import Notice from 'components/noticebar/index';
import HotCourse from 'components/hotCourse/index';
import CarouselGrid from 'components/carouselgrid';
import TitleContainer from 'components/titlecontainer/index';
import SpecialBox from 'components/specialbox/index';
import Container from 'components/container/index';
import InfoBox from 'components/infobox/index';
import CardSilder from 'components/swipers/index';
import SearchHeader from 'components/searchheader';

const PrefixCls = 'dashboard', Item = List.Item, Brief = Item.Brief;

const Dashboard = ({ dashboard, loading, dispatch, app }) => {
  const { BaseLine } = Layout,
    { bannerDatas, newCourse, listData, specialData, hotBannerDatas, infoDatas, cardSilderDatas, carouseDatas } = dashboard;
  
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <div className={styles[`${PrefixCls}-top`]}>
        <SearchHeader
          dispatch={dispatch}
          placeholder="搜索"
          children={<Icon
            type={getLocalIcon('/components/shopping.svg')}
          />}
        />
        <div>
          {bannerDatas.length > 0 &&
          <Banner bannerDatas={bannerDatas} handleClick={handleBuildingClick.bind(null, dispatch)} />}
        </div>
      </div>
      <Notice handleClick={handleBuildingClick.bind(null, dispatch)} />
      <WhiteSpace size="md" />
      <CarouselGrid datas={carouseDatas} />
      <WhiteSpace size="md" />
      <HotCourse bannerDatas={hotBannerDatas} handleClick={handleBuildingClick.bind(null, dispatch)} />
      <WhiteSpace size="md" />
      <Container
        title="新课推荐"
        children={infoDatas && infoDatas.map((data, i) => {
          return <InfoBox key={i} {...data} handleClick={handleBuildingClick.bind(null, dispatch)} />;
        })}
      />
      <WhiteSpace size="md" />
      <TitleContainer title="合作学校" />
      <CardSilder datas={cardSilderDatas} />
      <WhiteSpace size="md" />
      <TitleContainer title="猜你喜欢" />
      <List className={styles[`${PrefixCls}-list`]}>
        {
          listData && listData.map((data, i) => {
            return (
              <Item
                thumb={data.image}
                multipleLine
                wrap
                onClick={handleBuildingClick.bind(null, dispatch)}
              >
                <span> {data.title}</span>
                <div className={styles[`${PrefixCls}-list-info`]}>
                  <div className={styles[`${PrefixCls}-list-info-box`]}>
                    <span><Icon type={getLocalIcon('/components/rmb.svg')} size="xxs" /></span>
                    <span>{data.price}</span>
                  </div>
                  <div className={styles[`${PrefixCls}-list-info-box`]}>
                    <span><Icon type={getLocalIcon('/components/people.svg')} size="xxs" /></span>
                    <span>{data.people}</span>
                  </div>
                </div>
              </Item>
            );
          })
        }
      </List>
      <WhiteSpace size="md" />
      <TitleContainer title="专题课程" />
      <div className={styles[`${PrefixCls}-special`]}>
        {
          specialData && specialData.map((data, i) => {
            return <SpecialBox {...data} handleClick={handleBuildingClick.bind(null, dispatch)} />;
          })
        }
      </div>
      <BaseLine />
    </div>
  );
};

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ dashboard, loading, app }) => ({ dashboard, loading, app }))(Dashboard);
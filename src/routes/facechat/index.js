import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import FaceChatBox from 'components/facechatbox';
import { connect } from 'dva';
import styles from '../dashboard/index.less';

const PrefixCls = 'facechat';
const FaceChat = ({ location, dispatch, facechat }) => {
  const { name } = location.query,
    { dataList } = facechat,
    handlerClick = ({ text }) => {
      dispatch(routerRedux.push({
        pathname: 'facechatdetails',
        query: {
          name: text,
        },
      }));
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-special`]}>
        {
          cnIsArray(dataList) && dataList.map((data, i) => {
            return <FaceChatBox key={i} {...data} handleClick={handlerClick.bind(this, data)} />;
          })
        }
      </div>
    </div>
  );
};


export default connect(({ facechat }) => ({ facechat }))(FaceChat);

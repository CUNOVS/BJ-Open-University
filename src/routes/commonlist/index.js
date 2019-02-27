import React from 'react';
import PropTypes from 'prop-types';
import { commonRow } from 'components/row';
import Nav from 'components/nav';
import { handleLessonClick } from 'utils/commonevents';
import { connect } from 'dva';

const CommonList = ({ location, dispatch, commonlist }) => {
  const { name = '' } = location.query,
    { dataList } = commonlist;
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div>
        {
          dataList && dataList.map((data, i) => {
            return (
              commonRow(data, handleLessonClick.bind(null, dispatch))
            );
          })
        }
      </div>
    </div>
  );
};

CommonList.propTypes = {};

export default connect(({ commonlist }) => ({
  commonlist,
}))(CommonList);

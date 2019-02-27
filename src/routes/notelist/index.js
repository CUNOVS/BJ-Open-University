import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { WhiteSpace } from 'components';
import { myNoteRow } from 'components/row';
import { connect } from 'dva';

const NoteList = ({ location, dispatch, notelist }) => {
  console.log(location);
  const { name = '' } = location.query,
    { noteDate } = notelist;
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace size='xs' />
      <div>
        {
          noteDate && noteDate.map((data, i) => {
            return myNoteRow(data);
          })
        }
      </div>
    </div>
  );
};

NoteList.propTypes = {};

export default connect(({ notelist }) => ({
  notelist,
}))(NoteList);

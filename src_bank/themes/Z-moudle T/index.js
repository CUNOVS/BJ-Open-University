import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import styles from './index.less';
import CourseList from '../../components/courselist/index';

const PrefixCls = 'contacts';

const Contacts = ({ location, dispatch, contacts }) => {
  return (
    <div>
      <Nav title={name} dispatch={this.props.dispatch} />
    </div>
  );
};

Contacts.propTypes = {};
CourseList.defaultProps = {};
export default connect(({ loading, contacts }) => ({ loading, contacts }))(Contacts);

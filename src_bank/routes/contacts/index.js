import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { SearchBar, WhiteSpace, Accordion, List } from 'components';
import { connect } from 'dva';
import { contactsRow } from 'components/row';
import { handlerChangeRouteClick } from 'utils/commonevents';
import styles from './index.less';

const PrefixCls = 'contacts';

const Contacts = ({ location, dispatch, contacts }) => {
  const { name } = location.query;
  return (
    <div>
      <Nav title={name} dispatch={dispatch} hasShadow />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-searchbox`]}>
        <SearchBar placeholder="搜索联系人" />
      </div>
      <div className={styles[`${PrefixCls}-contactsbox`]}>
        <Accordion defaultActiveKey="0" className="my-accordion">
          <Accordion.Panel header="在线">
            {contactsRow(handlerChangeRouteClick.bind(null, 'conversation', { name: '已开课程' }, dispatch))}
          </Accordion.Panel>
          <Accordion.Panel header="离线">

          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
};

Contacts.propTypes = {};
Contacts.defaultProps = {};
export default connect(({ loading, contacts }) => ({ loading, contacts }))(Contacts);

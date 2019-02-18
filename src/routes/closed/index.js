import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon, Layout } from 'components';
import TitleContainer from 'components/titlecontainer/index';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { rateRow } from 'components/row';
import { handleLessonClick } from 'utils/commonevents';
import styles from './index.less';


const PrefixCls = 'closed';

function Closed ({ location, dispatch, closed }) {
  const { listData } = closed;
  const { BaseLine } = Layout;

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title="已开课程" isGoBack={false} hasShadow={true} />
      <div>
        <WhiteSpace size="xs" />

      </div>
    </div>
  );
}

export default connect(({ loading, closed }) => ({
  loading,
  closed,
}))(Closed);

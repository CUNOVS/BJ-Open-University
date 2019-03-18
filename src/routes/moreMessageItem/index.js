/* WKC
通知列表转跳的通知详情 */
import React from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import InnerHtml from 'components/innerhtml';
import styles from './index.less';

const PrefixCls = 'moreMessageItem';

class MoreMessageItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { banner, content = '' } = this.props.moreMessageItem;
    const { name = '' } = this.props.location.query;
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-content`]}><InnerHtml data={content} /></div>
      </div>
    );
  }
}

export default connect(({ moreMessageItem }) => ({
  moreMessageItem,
}))(MoreMessageItem);

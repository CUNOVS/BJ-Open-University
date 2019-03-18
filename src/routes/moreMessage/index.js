/* WKC
更多通知消息列表 */
import React from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import { List } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const Item = List.Item,
  PrefixCls = 'moreMessage';

class MoreMessage extends React.Component {
  constructor (props) {
    super(props);
  }

  Click = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/moreMessageItem',
      query: {
        name: '通知详情',
      },
    }));
  };

  render () {
    const { banner } = this.props.moreMessage;
    const { name = '' } = this.props.location.query;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <List className={styles[`${PrefixCls}-One`]}>
          {
            banner && banner.map((data, index) => (
              <Item
                arrow="horizontal"
                multipleLine
                key={index}
                onClick={this.Click}
              >
                {data}
              </Item>
            ))
          }
        </List>
      </div>
    );
  }
}

export default connect(({ moreMessage }) => ({
  moreMessage,
}))(MoreMessage);

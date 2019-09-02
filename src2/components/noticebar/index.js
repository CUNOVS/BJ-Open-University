/* WKC
 * Modal通知消息的弹出窗口,内容是用ref取的 */
import React from 'react';
import { Modal, NoticeBar, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import { getLocalIcon } from 'utils';


class Notice extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div onClick={this.props.click} >
        <NoticeBar
          marqueeProps={{ loop: true }}
          icon={<Icon style={{ marginRight: '5px' }} type={getLocalIcon('/components/notice.svg')} />}
          mode="closable"
          style={{ background: '#fdeeb9' }}
        >
          {this.props.content}
        </NoticeBar >
      </div >
    );
  }
}

Notice.propTypes = {};
Notice.defaultProps = {
  content: ''
};
export default Notice;

/* WKC
 * Modal通知消息的弹出窗口,内容是用ref取的 */
import React from 'react';
import { Modal, NoticeBar, Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils';


class Notice extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <NoticeBar
        marqueeProps={{ loop: true }}
        icon={<Icon style={{ marginRight: '5px' }} type={getLocalIcon('/components/notice.svg')} size="xxs" />}
        mode="closable"
        style={{ background: '#fdeeb9' }}
      >
        <div onClick={this.props.handlerClick} style={{ width: '100%' }} >
          {this.props.content}
        </div >
      </NoticeBar >
    );
  }
}

Notice.propTypes = {};
Notice.defaultProps = {
  content: '',
  handlerClick: null
};
export default Notice;

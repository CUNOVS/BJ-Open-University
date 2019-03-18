/* WKC
 * Modal通知消息的弹出窗口,内容是用ref取的 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, NoticeBar, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import { getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'notice';

class Notice extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      connect: '',
    };
  }

  showModal = key => (el) => {
    el.preventDefault();
    const element = ReactDOM.findDOMNode(this.vl);
    const banner = element.innerHTML;
    this.setState({
      [key]: true,
      connect: banner,
    });
  };
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };


  render () {
    return (
      <div>
        <div className={styles[`${PrefixCls}-box`]}>
          <NoticeBar
            marqueeProps={{ loop: true }}
            icon={<Icon style={{ marginRight: '5px' }} type={getLocalIcon('/components/notice.svg')} />}
            mode="closable"
            style={{ background: '#fdeeb9' }}
            action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}
          >
            新学期就用新的移动端app啦，要加油哦.新学期就用新的移动端app啦，要加油哦
          </NoticeBar>
        </div>
        <Modal
          visible={this.state.modal}
          transparent
          maskClosable={false}
          title="公告"
          footer={[{
            text: 'Ok',
            onPress: () => {
              console.log('ok');
              this.onClose('modal')();
            },
          }]}
        >
          <div style={{ overflow: 'scroll' }}>
            {this.state.connect}
          </div>
        </Modal>
      </div>
    );
  }
}
Notice.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
export default Notice;

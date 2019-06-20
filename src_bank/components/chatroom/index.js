import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './index.less';
import { ReceiveBubble, ReplyBubble } from './chatbubble/index';
import InputBox from 'components/inputbox';

const PrefixCls = 'chatroom';
let defaultTimer = '';

class ChatRoom extends Component {
  constructor (props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  componentDidMount () {
    setTimeout(() => {
      if (ReactDOM.findDOMNode(this.lv)) {
        const currentHeight = cnhtmlHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
          height: currentHeight,
        });
        this.scrollToBottom(ReactDOM.findDOMNode(this.lv));
      }
    }, 10);
  }

  scrollToBottom (el) {
    setTimeout(() => {
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 200);
  }

  componentDidUpdate () {
    this.scrollToBottom(ReactDOM.findDOMNode(this.lv));
  }


  render () {
    // const isSuccess = this.props.isSuccess;
    const useravatar = this.props.useravatar;
    const props = {
        onSubmit: this.props.onSubmit,
        val: this.props.val,
        dispatch: this.props.dispatch,
      },
      getShowTimer = (messageTimer = '') => {
        if (messageTimer && defaultTimer != messageTimer) {
          defaultTimer = messageTimer;
          return <div className={styles[`${PrefixCls}-timer`]}><span>{messageTimer}</span></div>;
        }
        return '';
      };
    return (
      <div>
        <div className={styles[`${PrefixCls}-outer`]}
          ref={el => this.lv = el}
          style={{ height: this.state.height }}
        >
          <div className={styles[`${PrefixCls}-outer-content`]} ref={el => this.contentEl = el}>
            {this.props.localArr && this.props.localArr.map((data, i) => {
              console.log(data)
              const { isMySelf = false, msgcDate = '', ...others } = data,
                props = {
                  ...others,
                  // isSuccess,
                  useravatar,
                },
                result = [getShowTimer(msgcDate)];
              result.push(isMySelf ? <ReplyBubble {...props} /> : <ReceiveBubble {...props} />);
              return result;
            })}
          </div>
          <div style={{ clear: 'both' }} />
          <InputBox {...props} handlerSubmit={this.props.handlerSubmit} />
        </div>
      </div>
    );
  }
}

ChatRoom.defaultProps = {


};
ChatRoom.propTypes = {
  handlerSubmit: PropTypes.func.isRequired,
};
export default ChatRoom;

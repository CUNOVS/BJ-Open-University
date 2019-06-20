/**
 * @author Lowkey
 * @date 2019/03/20 14:45:10
 * @Description:
 */
import { PullToRefresh } from 'antd-mobile';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getOffsetTopByBody } from 'utils';

let timer,
  timer2;

class Refresh extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      down: true,
      height: cnhtmlHeight,
    };
  }

  componentWillMount () {
    this._isMounted = true;
  }

  componentDidMount () {
    let el;
    if (this.ptr && (el = ReactDOM.findDOMNode(this.ptr))) {
      const hei = cnhtmlHeight - getOffsetTopByBody(el);
      if (this._isMounted) {
        timer = setTimeout(() => this.setState(() => ({
          height: hei
        })), 300);
      }
    }
    timer2 = setTimeout(() => {
      if (this.props.scrollerTop > 0) {
        el.scrollTo(0, this.props.scrollerTop);
      }
    }, 200);
  }


  componentWillUnmount () {
    this._isMounted = false;
    clearTimeout(timer);
    clearTimeout(timer2);
    if (this.ptr && (ReactDOM.findDOMNode(this.ptr))) {
      let scrollTop = ReactDOM.findDOMNode(this.ptr).scrollTop;
      if (scrollTop >= 0 && this.props.onScrollerTop) {
        this.props.onScrollerTop(scrollTop);
      }
    }
  }

  render () {
    return (<PullToRefresh
      ref={el => this.ptr = el}
      style={{
        height: this.state.height,
        overflow: 'auto',
      }}
      indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
      direction={this.state.down ? 'down' : 'up'}
      refreshing={this.props.refreshing}
      onRefresh={this.props.onRefresh}
    >
      {this.props.children || ''}
    </PullToRefresh >);
  }
}

Refresh.defaultProps = {
  refreshing: false,
};
Refresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};
export default Refresh;

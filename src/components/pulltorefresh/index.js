/**
 * @author Lowkey
 * @date 2019/03/20 14:45:10
 * @Description:
 */
import { PullToRefresh } from 'antd-mobile';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getOffsetTopByBody } from 'utils';

let timer;

class Refresh extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      down: true,
      height: cnhtmlHeight,
    };
  }

  componentDidMount () {
    let el;
    if (this.ptr && (el = ReactDOM.findDOMNode(this.ptr))) {
      const hei = cnhtmlHeight - getOffsetTopByBody(el);
      if (this._isMounted) {
        setTimeout(() => this.setState({
          height: hei,
        }), 100);
      }

    }
  }

  componentWillMount () {
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
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
    </PullToRefresh>);
  }
}

Refresh.defaultProps = {
  refreshing: false,
};
Refresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};
export default Refresh;

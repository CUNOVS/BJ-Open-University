/**
 * @author Lowkey
 * @date 2019/02/26 11:00:34
 * @Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './index.less';
import { Icon } from 'components';
import InnerHtml from 'components/innerhtml';
import { handlerDivInnerHTMLClick } from 'utils/commonevents';
import classNames from 'classnames';

const PrefixCls = 'introduction';

class Introduction extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false,
      isShow: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  componentDidMount () {
    this.timer = setTimeout(() => {
      const outerHei = ReactDOM.findDOMNode(this.out) && ReactDOM.findDOMNode(this.out).offsetHeight,
        innerHei = ReactDOM.findDOMNode(this.inner) && ReactDOM.findDOMNode(this.inner).offsetHeight;
      if (innerHei > outerHei) {
        this.setState({
          isShow: true,
        });
      }
    }, 5000);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
      });
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer);
  }

  render () {
    const { data, courseid, dispatch } = this.props,
      handleDivClick = (e) => {
        handlerDivInnerHTMLClick(e, courseid, dispatch);
      };
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <div
          ref={el => this.out = el}
          className={classNames(styles[`${PrefixCls}-outer-content`], { [styles.open]: this.state.isOpen })}
        >
          <div ref={el => this.inner = el}><InnerHtml data={data} handleClick={handleDivClick.bind(null)} />
          </div>
        </div>
        {this.state.isShow ?
          <div className={classNames(styles[`${PrefixCls}-mask`], { [styles.vague]: !this.state.isOpen })}
            onClick={this.handleClick}
          >
            <Icon type={this.state.isOpen ? 'up' : 'down'} size="lg" color="#22609c" />
          </div>
          :
          ''
        }
      </div>
    );
  }
}

Introduction.defaultProps = {
  data: '',
  dispatch: null,
  courseid: ''
};
Introduction.propTypes = {};

export default Introduction;

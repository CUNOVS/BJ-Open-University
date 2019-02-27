/* eslint-disable no-undef */
/**
 * @author Lowkey
 * @date 2018/10/23
 * @Description: android 打包后存在BUG
*/
import React from 'react';
import { Icon } from 'components/index';
import PropTypes from 'prop-types';
import styles from './index.less';
import { getLocalIcon } from 'utils';

const PrefixCls = 'searchheader';

class SearchHeader extends React.Component {
  state = {
    opacity: 0,
    isScroll: false,
  }

  componentDidMount () {
    this._isMounted = true
    if (this._isMounted){
      document.body.onscroll = () => {
        let sTop = document.documentElement.scrollTop || document.body.scrollTop;
        let currentOpacity = Math.min(100, sTop / 200);
        this.setState({
          opacity: this.state.opacity = currentOpacity,
          isScroll: true,
        });
        if (currentOpacity === 0) {
          this.setState({
            isScroll: false,
          });
        }
      };
    }
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render () {
    const bgColor = this.state.isScroll ? '#ddd' : '#fff', 
      color = this.state.isScroll ? '#fff' : '#666';
    return (
      <div className={styles[`${PrefixCls}-outer`]} style={{ background: `rgba(255,104,15,${this.state.opacity})` }}>
        <div className={styles[`${PrefixCls}-outer-search`]} style={{ background: bgColor, color }} onClick={this.props.Click}>
          <span> <Icon type="search" /></span>
          <span>搜索</span>
        </div>
        <div className={styles[`${PrefixCls}-outer-text`]}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

SearchHeader.defaultProps = {
  placeholder: '搜索',
};
SearchHeader.propTypes = {
  placeholder: PropTypes.string,
  children: PropTypes.element,
};
export default SearchHeader;

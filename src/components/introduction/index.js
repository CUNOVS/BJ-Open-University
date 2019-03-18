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
import classNames from 'classnames';

const PrefixCls = 'introduction';

class Introduction extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render () {
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <div
          ref={el => this.lv = el}
          className={classNames(styles[`${PrefixCls}-outer-content`], { [styles.open]: this.state.isOpen })}
        >
          <InnerHtml data={this.props.data} />
        </div>
        <div className={classNames(styles[`${PrefixCls}-mask`], { [styles.vague]: !this.state.isOpen })}
             onClick={this.handleClick}
        >
          <Icon type={this.state.isOpen ? 'up' : 'down'} size="lg" color="#22609c" />
        </div>
      </div>
    );
  }
}

Introduction.defaultProps = {
  data: '',
};
Introduction.propTypes = {};

export default Introduction;

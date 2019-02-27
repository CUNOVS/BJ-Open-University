import React from 'react';
import { Icon, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import { getLocalIcon } from 'utils';
import styles from './index.less';
import classNames from 'classnames';
import InfoBox from '../infobox';

const PrefixCls = 'purchase';

class Purchase extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      yep: 'false',
      yes: 'false',
    };
  }


  participant = () => {
    this.setState({
      yep: !this.state.yep,
    });
    if (this.state.yep) {
      Toast.success('加入成功', 1);
    }
  };
  shopping = () => {
    this.setState({
      yep: !this.state.yep,
    });
    if (this.state.yes) {
      Toast.success('加入成功', 1);
    }
  };

  render () {
    let userMessage;
    if (this.props.lessonType === 'attend') {
      userMessage = (<div
        className={classNames(styles[`${PrefixCls}-butt-button`], { [styles.back]: this.state.yep })}>
        <div className={styles[`${PrefixCls}-collect`]}>
          <div><span><Icon type={getLocalIcon('/buttons/collection.svg')} /></span></div>
          <div><span>收藏</span></div>
        </div>
        <div className={styles[`${PrefixCls}-attend`]}
             onClick={this.participant.bind(this)}>{this.state.yep ? '立即参加' : '已成功加入'}</div>
      </div>);
    } else if (this.props.lessonType === 'pay') {
      userMessage = (<div className={styles[`${PrefixCls}-butt-inHalf`]}>
        <div className={styles[`${PrefixCls}-collect`]}>
          <div><span><Icon type={getLocalIcon('/buttons/collection.svg')} /></span></div>
          <div><span>收藏</span></div>
        </div>
        <div className={styles[`${PrefixCls}-buttons`]}>
          <div className={styles[`${PrefixCls}-buttons-add`]} onClick={this.shopping.bind(this)}>加入购物车</div>
          <div className={styles[`${PrefixCls}-buttons-pay`]} onClick={this.props.Click.bind(this)}>立即购买</div>
        </div>
      </div>);
    } else {
      userMessage = '';
    }
    return (
        <div className={styles[`${PrefixCls}-butt`]}>
          {userMessage}
        </div>
    );
  }
}

Purchase.defaultProps = {
  lessonType: 'free',
};
Purchase.propTypes = {
  Click: PropTypes.func.isRequired,
};

export default Purchase;

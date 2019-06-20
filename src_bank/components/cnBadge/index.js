import React from 'react';
import styles from './index.less';

const PrefixCls = 'CnBadge';

class CnBadge extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div
          className={styles[`${PrefixCls}-${this.props.size}`]}
          style={{ background: this.props.background, color: this.props.color }}
        >
          {this.props.text}
        </div>
      </div>
    );
  }
}

CnBadge.defaultProps = {
  background: 'red',
  color: 'white',
  text: '合格',
  size: 'normal',
};

export default CnBadge;

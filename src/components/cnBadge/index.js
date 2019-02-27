import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import styles from './index.less';

const PrefixCls = 'CnBadge';

class CnBadge extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className={styles[`${PrefixCls}-one`]}
             style={{ background: this.props.background, color: this.props.color }}>
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
};

export default CnBadge;

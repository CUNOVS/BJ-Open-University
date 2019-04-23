import React from 'react';
import { connect } from 'dva';
import { InputItem } from 'components';
import styles from './index.less';


class ShortAnswer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  render () {

    return (
      <InputItem
        placeholder="请答题"
        autoHeight
      />
    );
  }
}

export default ShortAnswer;

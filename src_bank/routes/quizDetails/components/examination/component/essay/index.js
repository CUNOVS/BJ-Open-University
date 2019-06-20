import React from 'react';
import { connect } from 'dva';
import { TextareaItem  } from 'components';
import styles from './index.less';


class Essay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  render () {

    return (
      <TextareaItem
        placeholder="auto focus in Alipay client"
        autoHeight
      />
    );
  }
}

export default Essay;

import React from 'react';
import { connect } from 'dva';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './index.less';


class Match extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  render () {
    const { getFieldProps } = this.props.form;
    const { answer = [] } = this.props;
    return (
      <div>
        {
          answer.map((item, i) =>
            <Picker
              key={i}
              data={item.answer}
              cols={1}
              {...getFieldProps('district3')}>
              <List.Item arrow="horizontal">{item.question}</List.Item>
            </Picker>)
        }
      </div>
    );
  }
}

export default createForm()(Match);

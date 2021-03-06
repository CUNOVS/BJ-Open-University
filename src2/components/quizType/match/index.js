import React from 'react';
import { connect } from 'dva';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import ResultIcon from '../icon';
import styles from './index.less';


class Match extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.props.onRef(this);
  }

  onSubmit = () => {
    const fieldsValue = this.props.form.getFieldsValue(),
      result = {};
    for (let att in fieldsValue) {
      const value = fieldsValue[att];
      if (cnIsArray(value)) {
        value.map(v => {
          result[att] = v;
        });
      } else if (typeof value === 'object') {
        for (let attV in value) {
          result[attV] = value[attV];
        }
      } else {
        result[att] = value;
      }
    }
    return result;
  };

  render () {
    const { getFieldProps } = this.props.form;
    const { answer, type = 'quiz' } = this.props;
    return (
      <div >
        {
          answer.map((item, i) =>
            (<Picker
              key={i}
              data={item.answer}
              cols={1}
              onOk={this.handlerSelectCilck}
              disabled={type !== 'quiz'}
              {...getFieldProps(item.name,
                {
                  initialValue: [item.answer.find(child => child.selected === true).value]
                }
              )}
            >
              <List.Item arrow="horizontal" >
                <div className={styles.answer} >
                  {item.question}
                  {
                    item.currect !== '' && <ResultIcon currect={item.currect} />
                  }
                </div >
              </List.Item >
            </Picker >))
        }
      </div >
    );
  }
}


Match.propTypes = {};
Match.defaultProps = {
  onRef: () => (false)
};

export default createForm()(Match);

import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Radio, List, Checkbox } from 'components';
import ResultIcon from '../icon';
import styles from './index.less';

const RadioItem = Radio.RadioItem,
  CheckboxItem = Checkbox.CheckboxItem;

@createForm()
class Choose extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {

  }

  componentDidMount () {

  }


  checkboxChange = (value, id) => {
    this.props.dispatch({
      type: 'quizDetails/updateCheckVal',
      payload: {
        value,
        id
      }
    });
  };

  radioChange = (value, id) => {
    this.props.dispatch({
      type: 'quizDetails/updateVal',
      payload: {
        value,
        id
      }
    });
  };

  render () {
    const { answer, form, type = 'quiz' } = this.props;
    const { getFieldProps } = form;
    return (
      <List >
        {
          answer.map((item, i) => {
            if (item.type === 'radio') {
              return (
                <RadioItem
                  {...getFieldProps(item.name, {
                    initialValue: item.value,
                  })}
                  wrap
                  key={item.id}
                  checked={item.checked}
                  onClick={type === 'quiz' ? () => this.radioChange(item.value, item.id) : null}
                >
                  <div className={styles.answer} >
                    {item.label}
                    {
                      item.currect !== '' && <ResultIcon currect={item.currect} />
                    }
                  </div >
                </RadioItem >);
            }
            return (
              <CheckboxItem
                key={i}
                checked={item.checked}
                onChange={type === 'quiz' ? () => this.checkboxChange(item.value, item.id) : () => (false)}
              >
                <div className={styles.answer} >
                  {item.label}
                  {
                    item.currect !== '' && <ResultIcon currect={item.currect} />
                  }
                </div >
              </CheckboxItem >
            );
          })
        }
      </List >
    );
  }
}

Choose.propTypes = {};
Choose.defaultProps = {
  type: 'quiz'
};

export default Choose;

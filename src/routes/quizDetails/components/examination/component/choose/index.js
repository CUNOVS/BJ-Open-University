import React from 'react';
import { connect } from 'dva';
import { Radio, List, Checkbox } from 'components';
import styles from './index.less';

const RadioItem = Radio.RadioItem,
  CheckboxItem = Checkbox.CheckboxItem;

class Choose extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      radioValue: '0',
      checkboxValue: '0',
    };
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  onRadioChange = (value) => {
    console.log(value);
    this.setState({
      radioValue: value,
    });
  };

  onCheckboxChange = (value) => {
    console.log(value);
    this.setState({
      checkboxValue: value,
    });
  };

  render () {
    const { answer = [] } = this.props;
    const { radioValue, checkboxValue } = this.state;
    return (
      <List>
        {
          answer.map((item, i) => {
            if (item.type === 'radio') {
              return (
                <RadioItem
                  key={i}
                  defaultChecked={item.checked}
                  checked={radioValue === item.value}
                  onChange={() => this.onRadioChange(item.value)}
                >
                  {item.label}
                </RadioItem>);
            }
            return (
              <CheckboxItem
                key={i}
                defaultChecked={item.checked}
                onChange={() => this.onCheckboxChange(item.value)}
              >
                {item.label}
              </CheckboxItem>
            );
          })
        }
      </List>
    );
  }
}

export default Choose;

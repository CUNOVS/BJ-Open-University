import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { ActivityIndicator } from 'antd-mobile';
import AddHomework from 'components/addHomework';
import { connect } from 'dva';
import styles from './index.less';


class HomeWorkAdd extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
  }

  componentDidMount () {
  }

  onSubmit = (data) => {
    const { fileList, value } = data;
    if (fileList.length > 0) {
      this.props.dispatch({
        type: 'homeworkadd/uploadFile',
        payload: data,
      });
      this.props.dispatch({
        type: 'homeworkadd/updateState',
        payload: {
          animating: true
        }
      });
    } else {
      this.props.dispatch({
        type: 'homeworkadd/AddHomework',
        payload: value,
      });
      this.props.dispatch({
        type: 'homeworkadd/updateState',
        payload: {
          animating: true
        }
      });
    }
  };

  getInfo = (configs) => {
    const fileConfigs = {},
      textConfigs = {};
    cnIsArray(configs) && configs.map((item, i) => {
      if (item.plugin === 'file') {
        fileConfigs[item.name] = item.value;
      } else if (item.plugin === 'onlinetext') {
        textConfigs[item.name] = item.value;
      }
    });
    return { fileConfigs, textConfigs };
  };

  render () {
    const { assignId } = this.props.location.query,
      { itemid, animating } = this.props.homeworkadd,
      { data, } = this.props.homework,
      { configs = [], submitDataType } = data;
    const props = {
      configs: this.getInfo(configs),
      assignId,
      onSubmit: this.onSubmit,
      itemid,
      submitDataType,
    };
    return (
      <div>
        <Nav title="发起话题" dispatch={this.props.dispatch} />
        <AddHomework {...props} />
        <ActivityIndicator
          toast
          text="正在上传..."
          animating={animating}
        />
      </div >
    );
  }
}

HomeWorkAdd.defaultProps = {};
HomeWorkAdd.propTypes = {};

export default connect(({ homeworkadd, homework }) => ({
  homeworkadd,
  homework,
}))(HomeWorkAdd);

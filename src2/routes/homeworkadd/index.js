import React from 'react';
import Nav from 'components/nav';
import { ActivityIndicator, Modal } from 'components';
import { routerRedux } from 'dva/router';
import AddHomework from 'components/addHomework';
import { connect } from 'dva';

const alert = Modal.alert;

class HomeWorkAdd extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {

  }

  componentDidMount () {
  }

  componentWillUnmount () {
    this.props.dispatch({
      type: 'app/updateBackModal',
      payload: {
        showBackModal: false
      }
    });
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

  onBackSubmit = () => {
    this.props.dispatch({
      type: 'app/updateBackModal',
      payload: {
        showBackModal: false
      }
    });
    this.props.dispatch(routerRedux.goBack());
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

  showBackMoadl = () => {
    alert('退出？', '退出后不会保存当前操作！', [
      {
        text: '取消',
        onPress: () => this.props.dispatch({
          type: 'app/updateBackModal',
          payload: {
            showBackModal: false
          }
        })
      },
      { text: '确定', onPress: () => this.onBackSubmit() },
    ]);
  };

  render () {
    const { assignId } = this.props.location.query,
      { itemid, animating } = this.props.homeworkadd,
      { data = {} } = this.props.homework,
      { configs = [], submitDataType } = data;
    const { showBackModal = false } = this.props.app;
    const props = {
      configs: this.getInfo(configs),
      assignId,
      onSubmit: this.onSubmit,
      itemid,
      submitDataType,
    };
    return (
      <div >
        <Nav title="提交" dispatch={this.props.dispatch} isAlert />
        <AddHomework {...props} />
        <ActivityIndicator
          toast
          text="正在上传..."
          animating={animating}
        />
        {showBackModal && this.showBackMoadl()}
      </div >
    );
  }
}

HomeWorkAdd.defaultProps = {};
HomeWorkAdd.propTypes = {};

export default connect(({ homeworkadd, homework, app }) => ({
  homeworkadd,
  homework,
  app
}))(HomeWorkAdd);

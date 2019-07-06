import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import {
  List,
  InputItem,
  TextareaItem,
  Button,
  Toast,
  WhiteSpace,
  Picker,
  ImagePicker,
  whiteSpace
} from 'components';
import { handlerChangeRouteClick } from 'utils/commonevents';
import { replaceSystemEmoji } from 'utils';
import TitleBox from 'components/titlecontainer';
import styles from './index.less';


const PrefixCls = 'opinion',
  type = [
    {
      label: '课程内容',
      value: '课程内容',
    },
    {
      label: '平台功能',
      value: '平台功能',
    },
    {
      label: '使用问题',
      value: '使用问题',
    },
    {
      label: '其它',
      value: '其它',
    },
  ];

class Opinion extends Component {

  constructor (props) {
    super(props);
    this.state = {
      files: [],
      multiple: false,
    };
  }

  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  };

  onChange = (files) => {
    let reg = /image/,
      result = [];
    files.map((data, i) => {
      if (!reg.test(data.file.type)) {
        Toast.fail('这不是图片哟！！！', 2);
      } else {
        result.push(data);
      }
    });
    this.setState({
      files: result,
    });
  };

  getKey = (name) => name;

  getUploadFiles = () => {
    const uploadFiles = {},
      uploadKey = [];
    this.state.files.map((file, i) => {
      if (file.file) {
        let key = this.getKey(`opinionFile_${i}`);
        uploadKey.push(key);
        uploadFiles[key] = file.file;
      }
    });
    return {
      uploadFiles,
      uploadKey: uploadKey.join(','),
    };
  };

  onSubmit = () => {
    const { files } = this.state;
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
            ...this.props.form.getFieldsValue(),
          },
          { uploadFiles, uploadKey } = this.getUploadFiles();
        if (files.length > 0) {
          this.props.dispatch({
            type: 'opinion/sendOpinionFiles',
            payload: {
              uploadFiles,
              uploadKey,
              ...this.changeValue(data)
            }
          });
        } else {
          this.props.dispatch({
            type: 'opinion/sendOpinion',
            payload: {
              ...this.changeValue(data)
            }
          });
        }
      } else {
        Toast.fail('意见必须输入');
      }
    });
  };

  render () {
    const { name = '意见反馈' } = this.props.location.query,
      { getFieldProps, } = this.props.form;
    const { files } = this.state;
    return (
      <div >
        <Nav
          title={name}
          dispatch={this.props.dispatch}
          hasShadow
          renderNavRight={
            <span
              style={{ color: '#fff' }}
              onClick={handlerChangeRouteClick.bind(this, 'myopinion', { name: '我的反馈' }, this.props.dispatch)} >
              我的反馈
            </span >
          }
        />
        <div className={styles[`${PrefixCls}-outer`]} >
          <div className={styles[`${PrefixCls}-outer-title`]} >您有什么问题或建议想反馈给我们？</div >
          <form >
            <List >
              <Picker
                data={type}
                cols={1}
                {...getFieldProps('submitType', {
                  initialValue: '',
                  rules: [{ required: true, message: '请选择意见类型' }],
                })}
                className="forss" >
                <List.Item arrow="horizontal" >意见类型：</List.Item >
              </Picker >
            </List >
            <List.Item className={styles[`${PrefixCls}-outer-content`]} >
              <TextareaItem
                {...getFieldProps('submitContent', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入您的意见' }],
                })}
                rows={10}
                placeholder={'您的宝贵意见，就是我们进步的源泉'}
              />
            </List.Item >
            <InputItem
              {...getFieldProps('submitUserPhone', {
                initialValue: '',
              })}
            >
              电话(选填)
            </InputItem >
            <WhiteSpace />
            <TitleBox title="上传图片" sup="" />
            <ImagePicker
              style={{ background: '#fff', paddingBottom: '10px' }}
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 4}
              multiple={this.state.multiple}
              accept="image/*"
            />
            <div className={styles[`${PrefixCls}-outer-button`]} >
              <Button type="primary" onClick={this.onSubmit.bind(this)} >提交</Button >
            </div >
          </form >
          <div className={styles[`${PrefixCls}-outer-footer`]} >
            感谢您为我们提供宝贵的意见或建议
          </div >
        </div >
      </div >
    );
  }
}

export default connect(({ loading, opinion }) => ({
  loading,
  opinion,
}))(createForm()(Opinion));

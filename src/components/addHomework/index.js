import React from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import { createForm } from 'rc-form';
import {
  List,
  InputItem,
  TextareaItem,
  Button,
  Toast,
  Icon,
  WhiteSpace,
  WingBlank,
  Picker,
  Modal
} from 'components';
import TitleBox from 'components/titlecontainer';
import { getCommonDate, getLocalIcon, renderSize } from 'utils';
import styles from './index.less';

const Item = List.Item;
const alert = Modal.alert;
const Brief = Item.Brief;
const getIcon = (type) => {
  if (RegExp(/pdf/)
    .exec(type)) {
    return '/components/PDF.svg';
  } else if (RegExp(/word/)
    .exec(type)) {
    return '/components/DOCX.svg';
  } else if (RegExp(/xlsb/)
    .exec(type)) {
    return '/components/EXCEL.svg';
  } else if (RegExp(/image/)
    .exec(type)) {
    return '/components/IMAGE.svg';
  }
  return '/components/file.svg';
};

@createForm()
class AddHomework extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  componentWillMount () {

  }


  componentDidMount () {
    const { submitDataType = [] } = this.props;
    this.setState({
      fileList: this.getDefaultList(submitDataType)
    });
  }

  onSubmit = () => {
    const { assignId } = this.props;
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const { fileList } = this.state;
        const data = {
          fileList,
          value: {
            ...this.props.form.getFieldsValue(),
            assignmentid: assignId,
            filemanager: '426570226'
          }
        };
        this.props.onSubmit(data);
      } else {
        Toast.fail('');
      }
    });
  };

  onRemove = (uid) => {
    this.setState((state) => (
      { fileList: state.fileList.filter(item => item.uid !== uid) }
    ));
  };

  getDefaultList = (arr) => {
    const res = [];
    if (arr.find(item => item.type === 'file')) {
      arr.find(item => item.type === 'file')
        .files
        .map((item, i) => (
          res.push({
            name: item.filename,
            lastModified: item.timemodified * 1000,
            type: item.mimetype,
            uid: `-${i--}`
          })
        ));
      return res;
    }
    return [];
  };

  getDefaultText = (arr) => {
    if (arr.find(item => item.type === 'onlinetext')) {
      return arr.find(item => item.type === 'onlinetext').editorfields[0].text;
    }
    return '';
  };

  renderFileList = (files) => (
    files.map((item, i) => {
      const { name, lastModified, type, uid } = item;
      return (
        <List key={i} className={styles.fileList} >
          <Item
            extra={
              <div onClick={() => this.onRemove(uid)} >
                <Icon type={getLocalIcon('/components/delete.svg')} color="#22609c" />
              </div >
            }
            thumb={<Icon type={getLocalIcon(getIcon(type))} size="lg" color="#22609c" />}
            multipleLine
            onClick={() => {
            }}
          >
            {name}
            <Brief >{getCommonDate(lastModified / 1000)}</Brief >
          </Item >
        </List >
      );
    })
  );

  render () {
    const { getFieldProps, getFieldError } = this.props.form,
      { fileList } = this.state,
      { submitDataType = [], configs: { fileConfigs, textConfigs } } = this.props,
      { maxsubmissionsizebytes, maxfilesubmissions } = fileConfigs,
      { wordlimit, wordlimitenabled } = textConfigs,
      props = {
        beforeUpload: (file) => {
          if (file.size < maxsubmissionsizebytes && fileList.length < maxfilesubmissions) {

            this.setState(state => ({
              fileList: [...state.fileList, file],
            }));
          } else if (fileList.length >= maxfilesubmissions) {
            Toast.fail('超过文件最大上传数量');
          } else {
            Toast.fail('最大尺寸大于限制尺寸');
          }

          return false;
        },
        listType: 'picture',
        showUploadList: false,
      };
    return (
      <div className={styles.outer} >
        <form className={styles.form} >
          {
            textConfigs.enabled ?
              <div >
                <TitleBox title="在线文本提交" sup="" />
                <List.Item >
                  <TextareaItem
                    {...getFieldProps('onlinetext', {
                      initialValue: this.getDefaultText(submitDataType),
                      rules: [{ required: false, message: '请输入内容' }],
                    })}
                    count={wordlimit * 1}
                    rows={10}
                    placeholder={'请输入内容'}
                  />
                </List.Item >
              </div >
              :
              ''
          }
          <WhiteSpace size="lg" />
          {
            fileConfigs.enabled ?
              <div >
                <TitleBox title="文件提交" sup="" />
                <WingBlank >
                  <List className={styles.rule} >
                    <Item >
                      {maxsubmissionsizebytes && maxfilesubmissions ? `新文件的最大尺寸:${renderSize(maxsubmissionsizebytes)},最多附件${maxfilesubmissions}` : null}
                    </Item >
                  </List >
                  {this.renderFileList(fileList)}
                  <WhiteSpace size="lg" />
                  <div className={styles.upload} >
                    <Upload
                      {...props}
                    >
                      <Button type="ghost" >
                        <Icon type="add" />
                        添加文件
                      </Button >
                    </Upload >
                  </div >
                </WingBlank >
              </div >
              :
              ''
          }
          <WhiteSpace size="lg" />
          <WingBlank >
            <Button type="primary" onClick={
              () => alert('提交作业', '确定提交本次修改?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => this.onSubmit() },
              ])
            } >提交</Button >
          </WingBlank >
          <WhiteSpace size="lg" />
        </form >
      </div >
    );
  }
}

AddHomework.defaultProps = {};
AddHomework.propTypes = {};

export default AddHomework;

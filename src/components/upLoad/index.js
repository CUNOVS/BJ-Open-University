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
  Picker
} from 'components';
import { getCommonDate, getLocalIcon, renderSize } from 'utils';
import styles from './index.less';

const Item = List.Item;
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
class UpLoad extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  onAddSubmit = () => {
    const { course = '', id, type } = this.props;
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const { fileList } = this.state;
        let data = {};
        if (type === 'add') {
          data = {
            fileList,
            value: {
              ...this.props.form.getFieldsValue(),
              courseid: course,
              forumid: id
            }
          };
        } else {
          data = {
            fileList,
            value: {
              ...this.props.form.getFieldsValue(),
              postid: id
            }
          };
        }

        this.props.onSubmit(data);
      } else {
        Toast.fail('提交失败');
      }
    });
  };

  onReplySubmit = () => {
    const { course, id } = this.props;
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const { fileList } = this.state;
        const data = {
          fileList,
          value: {
            ...this.props.form.getFieldsValue(),
            courseid: course,
            forumid: id
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
      { maxattachments, maxbytes, groups, loading = false, type, subject, groupid } = this.props,
      props = {
        beforeUpload: (file) => {
          if (file.size < maxbytes && fileList.length < maxattachments) {
            this.setState(state => ({
              fileList: [...state.fileList, file],
            }));
          } else if (fileList.length >= maxattachments) {
            Toast.fail('超过文件最大上传数量');
          } else {
            Toast.fail('最大尺寸大于限制尺寸');
          }

          return false;
        },
        listType: 'picture',
        fileList,
        showUploadList: false,
      };
    return (
      <div >
        <form >
          <List.Item >
            <InputItem
              {...getFieldProps('subject', {
                initialValue: type === 'add' ? '' : subject,
                rules: [{ required: true, message: '主题必须输入' },
                ],
              })}
              clear
              error={!!getFieldError('subject') && Toast.fail(getFieldError('subject'))}
              placeholder="主题"
            >
              主题
            </InputItem >
            <TextareaItem
              {...getFieldProps('message', {
                initialValue: '',
                rules: [{ required: true, message: '请输入内容' }],
              })}
              rows={10}
              placeholder={'请输入内容'}
            />
          </List.Item >
          {
            type === 'add' ?
              <div className={styles.picker} >
                <Picker
                  data={groups}
                  cols={1}
                  {...getFieldProps('groupid', { initialValue: [groupid] })}
                  disabled
                >
                  <List.Item arrow="horizontal" >小组：</List.Item >
                </Picker >
              </div >
              :
              null
          }
          <WhiteSpace size="lg" />
          <WingBlank >
            <List className={styles.rule} >
              <Item >
                {maxbytes && maxattachments ? `新文件的最大尺寸:${renderSize(maxbytes)},最多附件${maxattachments}` : null}
              </Item >
            </List >
            {this.renderFileList(fileList)}
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
          <WhiteSpace size="lg" />
          <WingBlank >
            <Button loading={loading} type="primary" onClick={this.onAddSubmit.bind(this)} >提交</Button >
          </WingBlank >
        </form >
      </div >
    );
  }
}

UpLoad.defaultProps = {};
UpLoad.propTypes = {};

export default UpLoad;

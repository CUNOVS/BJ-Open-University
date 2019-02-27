/**
 * @author Lowkey
 * @date 2018/10/29
 * @Description: 上传笔记页面
*/
import { Component } from 'react'
import { createForm } from 'rc-form'
import { connect } from 'dva'
import Nav from 'components/nav'
import {
  List,
  InputItem,
  TextareaItem,
  Button,
  Toast,
  Icon,
  WhiteSpace,
  ImagePicker,
} from 'components'
import { getLocalIcon } from 'utils'
import styles from './index.less'


const PrefixCls = 'notetaking'

class NoteTaking extends Component {

  constructor (props) {
    super(props)
    this.state = {
      files: [],
      multiple: true,
    }
  }

  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i])
      }
    }
    return obj
  }

  onSubmit = (isPatry) => {
    console.log(isPatry)
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
          ...this.props.form.getFieldsValue(),
        }
        if (isPatry) {
          this.props.dispatch({
            type: 'opinion/sendPatryOpinion',
            payload: {
              ...data,
            },
          })
        } else {
          this.props.dispatch({
            type: 'opinion/sendOpinion',
            payload: {
              ...data,
            },
          })
        }
      } else {
        Toast.fail('意见必须输入')
      }
    })
  }
  onChange = (files, type, index) => {
    let reg = /image/,
      result = []
    files.map((data, i) => {
      if (!reg.test(data.file.type)) {
        Toast.fail('这不是图片哟！！！', 2)
      } else {
        result.push(data)
      }
    })
    this.setState({
      files: result,
    })
  }
  handleCameraClick = (blob, dataUrl) => {
    const { files } = this.state
    files.push({ file: blob, url: this.dataUrlToImageSrc(dataUrl) })
    this.setState({
      files,
    })
  }
  renderRight = () => {
    return (
      <div className={styles[`${PrefixCls}-sendbutton`]} onClick={this.onSubmit}>发送</div>
    )
  }

  render () {
    const { name = '记笔记' } = this.props.location.query,
      { getFieldProps, getFieldError } = this.props.form

    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} hasShadow={true} renderNavRight={this.renderRight()}/>
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <InputItem
              {...getFieldProps('autofocus')}
              clear
              placeholder="请输入标题"
              ref={el => this.autoFocusInst = el}
            >标题</InputItem>
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('content', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入笔记内容' }],
                })}
                rows={10}
                placeholder={'好记性不如烂笔头'}
              />
            </List.Item>
            <div className={styles[`${PrefixCls}-outer-img`]}>
              <div>
                <p>添加图片</p>
                {this.state.files.length >= 4 ? '' : <span onClick={cnTakePhoto.bind(null, this.handleCameraClick, 1)}>
                  <Icon type={getLocalIcon('/buttons/camerawhite.svg')}/>
                </span>}
              </div>
              <ImagePicker
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 4}
                multiple={this.state.multiple}
                accept="image/*"
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(({ loading, notetaking }) => ({
  loading,
  notetaking,
}))(createForm()(NoteTaking))

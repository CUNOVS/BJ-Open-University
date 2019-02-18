import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'
import classNames from 'classnames'

const PrefixCls = 'introduction'

class Introduction extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: true,
    }
  }

  handleClick () {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  componentWillMount () {

  }

  render () {
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <div
          className={classNames(styles[`${PrefixCls}-outer-content`], { [styles.open]: this.state.isOpen })}>  《3-6岁儿童学习与发展》是北京开放大学学前教育专业专科常规课程，4学分。本课程主要包括3-6岁儿童发展目标与特点，幼儿园健康、语言、科学、社会、艺术（音乐、美术）五大领域课程的具体内容、课程特点、活动设计的原则、以及如何进行评价等方面的内容。通过本课程的学习，旨在让幼儿教师了解幼儿在五大领域中是如何学习和发展的，以及如何组织好五大领域的活动，为实践工作提供支持。
        </div>
        <div className={styles[`${PrefixCls}-outer-button`]}
             onClick={this.handleClick.bind(this)}>
          {this.state.isOpen ? '收起' : '展开'}
          </div>
      </div>
    )
  }
}

Introduction.defaultProps = {}
Introduction.propTypes = {}

export default Introduction

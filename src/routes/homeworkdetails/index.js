/**
 * @author Lowkey
 * @date 2018/11/07 17:44:43
 * @Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import styles from './index.less';
import InputBox from 'components/inputbox';

const PrefixCls = 'homeworkdetails';

class HomeWorkDetails extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {

  }

  componentWillMount () {
  }

  render () {
    const { name = '' } = this.props.location.query,
      { title, question } = this.props.homeworkdetails;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-container`]}>
          <h3>{title}</h3>
          <p>{question}</p>
        </div>
        <InputBox />
      </div>
    );
  }
}

HomeWorkDetails.propTypes = {};

export default connect(({ homeworkdetails }) => ({
  homeworkdetails,
}))(HomeWorkDetails);

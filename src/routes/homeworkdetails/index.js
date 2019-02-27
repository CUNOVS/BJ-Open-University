import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Icon, List } from 'antd-mobile';
import ReactDOM from 'react-dom';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import styles from './index.less';
import imag from '../../svg/WKCjob/duigou.svg';
import classNames from 'classnames';

const PrefixCls = 'homeworkdetails',
  Item = List.Item;


class HomeworkDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: 0,
      textHeight: '4rem',
      judge: true,
    };
  }

  componentDidMount () {
    const currentHeight = window.innerHeight,
      currentTop = ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({
      height: currentHeight - currentTop,
    });
  }

  dropDown = (judge) => {
    if (judge) {
      this.setState({
        textHeight: '100%',
        judge: !this.state.judge,
      });
    } else {
      this.setState({
        textHeight: '4rem',
        judge: !this.state.judge,
      });
    }
  };

  render () {
    const { name } = this.props.location.query,
      { data, content, title } = this.props.homeworkdetails;

    console.log(this.state.height);
    return (
      <div>
        <div>
          <Nav title={name} dispatch={this.props.dispatch}
               renderNavRight={<Icon type={getLocalIcon(`/WKCjob/tijiao.svg`)} />} />

          <div className={styles[`${PrefixCls}-top`]}>
            <div className={styles[`${PrefixCls}-firstFloor`]}>
              <div>{title.title}</div>
              <div style={{ color: '#1eb259' }}>{title.fraction}</div>
            </div>
            <div className={styles[`${PrefixCls}-twoLevel`]}>
              <div>
                <span><Icon type={getLocalIcon('/WKCjob/duigou.svg')} size='xs' color='#22609c' /></span>
                <span>{title.type}</span>
              </div>
              <div className={styles[`${PrefixCls}-twoLevel-week`]}>
                <span><Icon type={getLocalIcon('/WKCjob/table.svg')} size='xs' color='#171717' /></span>
                <span>{title.week}</span>
              </div>
            </div>
          </div>

          <div style={{ height: this.state.textHeight, marginBottom: '10px' }}
               className={styles[`${PrefixCls}-content`]}>
            <div style={{ height: '72%' }} dangerouslySetInnerHTML={{ __html: `${content}` }}
                 className={classNames(styles[`${PrefixCls}-content-text`], this.state.judge ? styles[`${PrefixCls}-content-button`] : '')}></div>
            <Icon onClick={this.dropDown.bind(this, this.state.judge)} ref={el => this.two = el}
                  style={{ width: '100%' }} type={this.state.judge ? 'down' : 'up'} color='#22609c' size='lg' />
          </div>
        </div>

        <div ref={el => this.lv = el} style={{ height: this.state.height, background: 'white' }}>
          <div className={styles[`${PrefixCls}-state`]}>
            <Icon className={styles[`${PrefixCls}-topII-Icon`]} type='down' color='#888' />
            未提交
          </div>

          <List className={styles[`${PrefixCls}-list`]}>
            {data.map((data, index) => (
              <Item thumb={<Icon className={styles[`${PrefixCls}-list-item`]}
                                 type={getLocalIcon(`/WKCjob/${index}.svg`)} />}
                    extra={data.state}
              >
                {data.title}
              </Item>
            ))}
          </List>
        </div>
      </div>
    );
  }

  s;
}


export default connect(({ homeworkdetails }) => ({
  homeworkdetails,
}))(HomeworkDetails);

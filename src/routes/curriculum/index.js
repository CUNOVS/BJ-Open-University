/* WKC
这是课程列表页 */
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from 'components/nav';
import { connect } from 'dva';
import { List, Icon, WhiteSpace, Drawer, Tag } from 'components';
import { getLocalIcon, handleBuildingClick, getOffsetTopByBody } from 'utils';
import { commonRow } from 'components/row';
import { handleLessonClick } from 'utils/commonevents';
import { routerRedux } from 'dva/router';
import ClassifyItem from 'components/classifyitem';
import styles from './index.less';

const PrefixCls = 'curriculum';
const dataCop = [
  { value: 0, label: '前端技术', id: 0, yep: true },
  { value: 1, label: '前端开发', id: 1, yep: false },
  { value: 2, label: '后端开发', id: 2, yep: false },
  { value: 3, label: '移动开发', id: 3, yep: false },
  { value: 4, label: '大数据', id: 4, yep: false },
  { value: 5, label: '数据库', id: 5, yep: false },
];

class Curriculum extends React.Component {
  constructor () {
    super();
    this.state = {
      open: false,
      height: '100%',
      top: 0,
    };
  }

  hanlerDrawerClick = (dispatch, open) => {
    console.log(open);
    dispatch({
      type: 'curriculum/updateState',
      payload: {
        open: !open,
      },
    });
  };

  componentDidMount () {
    const currentTop = getOffsetTopByBody(ReactDOM.findDOMNode(this.lv)),
      currentHeight = cnhtmlHeight - currentTop;
    this.setState({
      top: currentTop,
      height: currentHeight + 'px',
    });
  }

  render () {
    const { name = '' } = this.props.location.query,
      { currentValue, currentClassify, dataList, open } = this.props.curriculum;

    return (<div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} hasShadow={true} dispatch={this.props.dispatch} />
      <div className={styles[`${PrefixCls}-classify`]} style={{ padding: '10px' }}
           onClick={this.hanlerDrawerClick.bind(this, this.props.dispatch, open)}>
        <span><Icon type={getLocalIcon('/buttons/classify.svg')} /></span>
        <span>{currentClassify}</span>
      </div>
      <div ref={el => this.lv = el} />
      <Drawer
        className="my-drawer"
        style={{ maxHeight: this.state.height, top: this.state.top }}
        enableDragHandle={false}
        contentStyle={{ color: '#A6A6A6' }}
        sidebar={<ClassifyItem data={dataCop} dispatch={this.props.dispatch} currentValue={currentValue} />}
        open={open}
      >
        <List className={styles[`${PrefixCls}-list`]}>
          {
            dataList && dataList.map((data, i) => {
              return (
                commonRow(data, handleLessonClick.bind(null, this.props.dispatch))
              );
            })
          }
        </List>
      </Drawer>
    </div>);
  }
}

export default connect(({ curriculum }) => ({
  curriculum,
}))(Curriculum);

import React from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import { homeworkRow } from 'components/row';
import TitleBox from 'components/titlecontainer';
import { routerRedux } from 'dva/router';

class Homework extends React.Component {
  constructor (props) {
    super(props);
  }

  Click = (dispatch) => {
    dispatch(routerRedux.push({
      pathname: '/homeworklist',
    }));
  };

  render () {
    const { name = '' } = this.props.location.query;
    const { listData } = this.props.homework;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <TitleBox title="课程" sup="" />
        {homeworkRow(listData, this.Click.bind(null, this.props.dispatch))}
      </div>
    );
  }
}

export default connect(({ homework }) => ({
  homework,
}))(Homework);

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import CoursePage from 'components/coursepage';

class Page extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      startTime: 0
    };
  }

  componentDidMount () {
    const { courseid = '', cmid = '', type = 'mod', modname } = this.props.location.query;
    this.setState(() => ({
      startTime: new Date()
    }));
    this.props.dispatch({
      type: 'app/logApi',
      payload: {
        assesstime: new Date().getTime(),
        courseid,
        cmid,
        type,
        modname
      }
    });
  }

  componentWillUnmount () {
    const { courseid = '', cmid = '' } = this.props.location.query;
    this.props.dispatch({
      type: 'app/accessTime',
      payload: {
        startedat: this.state.startTime.getTime(),
        endedat: new Date().getTime(),
        courseid,
        cmid,

      }
    });
  }

  render () {
    const { page } = this.props;
    return (
      <CoursePage dispatch={this.props.dispatch} propDatas={page} pathname={'page'} />
    );
  }
}

export default connect(({ loading, page, app }) => ({
  loading,
  page,
  app
}))(Page);

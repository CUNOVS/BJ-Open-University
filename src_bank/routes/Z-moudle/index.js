import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';


class Moudle extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
  }

  componentWillMount () {
  }

  render () {
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
      </div>
    );
  }
}

Moudle.defaultProps = {
  image: '',
  title: 'hxi',
  price: '免费',
  number: '212',
};
Moudle.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default connect(({ loading, moudle }) => ({
  loading, moudle,
}))(Moudle);

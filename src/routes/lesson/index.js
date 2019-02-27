/**
 * @author Lowkey
 * @date 2018/10/24
 * @Description:
*/
import React from 'react'
import { connect } from 'dva';
import PropTypes from 'prop-types'
import TitleBox from 'components/titlecontainer'
import { WhiteSpace, Badge } from 'components'
import Introduction from 'components/introduction'
import NoContent from 'components/nocontent'
import Rate from 'rc-rate'
import '../../../node_modules/rc-rate/assets/index.css'
import ReactDOM from 'react-dom'
import { getOffsetTopByBody } from 'utils'
import TransparentHeader from 'components/transparentheader'

const PrefixCls = 'lesson'
class Lesson extends React.Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount () {}
      
    componentWillMount() {}     
    
    render(){
        return(
            <div>
              <TransparentHeader dispatch={this.props.dispatch}/>

            </div>
        )
    }
}

Lesson.propTypes = {

}

export default connect(({loading,lesson }) => ({
  loading,
  lesson
}))(Lesson)

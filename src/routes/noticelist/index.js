import React from 'react'
import PropTypes from 'prop-types'
import Nav from 'components/nav'
import { connect } from 'dva'
import { noticeRow } from 'components/row'
import { routerRedux } from 'dva/router';

class NoticeList extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
	  	const Click = () => {
			this.props.dispatch(routerRedux.push({
				pathname:'/moreMessageItem',
				query:{
					name:"详情",
				}
			}))
		}

    	const { name='' } = this.props.location.query
    	const { data } = this.props.noticelist
        return(
            <div>
                <Nav title={name} dispatch={this.props.dispatch}/>
                { data.map((data) => noticeRow(data,Click)) }
            </div>
        )
    }
}


export default connect(({ noticelist }) => ({
  noticelist
}))(NoticeList )

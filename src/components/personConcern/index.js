import React from 'react'
import PropTypes from 'prop-types'
import Nav from 'components/nav'
import TitleBox from 'components/titlecontainer'
import CarouselGrid from 'components/carouselgrid' 
import { getImages, getLocalIcon, handleBuildingClick } from 'utils'
import { connect } from 'dva'
import styles from './index.less'

const PrefixCls='personConcern';

class PersonConcern extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
                <div className={styles[`${PrefixCls}-back`]}>
                	<div className={styles[`${PrefixCls}-back-One`]}>
                		<div style={{marginRight:'-5%'}}>关注</div>
                		<div className={styles[`${PrefixCls}-back-One`]}>
							{
								this.props.banner && this.props.banner.map((data,index) => (
									<img src={getImages(data, "de")} style={{width: '1rem',marginLeft:'-20%'}}/>
								))
							}
                		</div>
                		<div style={{marginLeft:'-5%'}}>15,352人</div>
                	</div>
                </div>
        )
    }
}

export default PersonConcern
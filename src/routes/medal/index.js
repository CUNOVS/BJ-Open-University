import React from 'react'
import PropTypes from 'prop-types'
import Nav from 'components/nav'
import { connect } from 'dva'
import ReactDOM from 'react-dom';
import { getImages } from 'utils'
import { routerRedux } from 'dva/router';
import styles from './index.less'
import { Icon } from 'antd-mobile'

const PrefixCls='medal'

class Medal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
			height:0,      	
        }
    }  

	componentDidMount () {
		const currentHeight = window.innerHeight
		this.setState({
			height: currentHeight,
		});
	}
 

    Click = () => {
		this.props.dispatch(routerRedux.push({
	        pathname: '/jobDetails',
	        query:{
	        	name:'x'
	        }
	    }));
	} 
 
    render(){
    	const {name} = this.props.location.query,
    			{data} = this.props.medal
        return(
            <div style={{height:this.state.height,background:'white'}}>
                <Nav title={name} dispatch={this.props.dispatch}/>
                <div className={styles[`${PrefixCls}-imag`]} onClick={this.Click.bind(this)}>
                	<img src={data.image} />
                </div>
				<div className={styles[`${PrefixCls}-top`]}>
					<div className={styles[`${PrefixCls}-title`]}>
						<Icon type='down' color='#888' size='xs' />
						勋章详情
					</div>
				</div>
				<div className={styles[`${PrefixCls}-text`]}>名称:   {data.name}</div>
				<div className={styles[`${PrefixCls}-text`]}>描述:   {data.describe}</div>

				<div className={styles[`${PrefixCls}-top`]}>
					<div className={styles[`${PrefixCls}-title`]}>
						<Icon type='down' color='#888' size='xs' />
						课程
					</div>
				</div>
				<div className={styles[`${PrefixCls}-text`]}>{data.class}</div>
				
				<div className={styles[`${PrefixCls}-top`]}>
					<div className={styles[`${PrefixCls}-title`]}>
						<Icon type='down' color='#888' size='xs' />
						有效期
					</div>
				</div>
				<div className={styles[`${PrefixCls}-text`]}>授予日期:   {data.effective}</div>
				<div className={styles[`${PrefixCls}-text`]}>到期日期:   {data.invalid}</div>				
            </div>
        )
    }s
}



export default connect(({ medal }) => ({
    medal
}))(Medal)

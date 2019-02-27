/*WKC
课表页,没写到row列表里*/
import { connect } from 'dva';
import Nav from 'components/nav';
import { Modal, Tabs, WhiteSpace, List, Icon, Layout, SearchBar } from 'components';
import ClassifyItem from 'components/classify';
import { handleBuildingClick, getLocalIcon } from 'utils';
import styles from './index.less';
import { routerRedux } from 'dva/router';

const PrefixCls = 'timetable', 
  Item = List.Item, 
  Brief = Item.Brief;

function Timetable ({ location, dispatch, timetable }) {
  const { name = '' } = location.query,
  			{banner} = timetable
  			
  const Click = () => {
    dispatch(routerRedux.push({
      pathname:'createTable'
    }))  	
  }
   return(
   	<div>
   		<Nav title={name} dispatch={dispatch} />
   		{
   			banner && banner.map((data,index) => (
					<div className={styles[`${PrefixCls}-sun`]}>
			   		<div className={styles[`${PrefixCls}-One`]} style={{padding:'0.3rem'}}>
			   			<div>{data.title}</div>
			   			<div className={styles[`${PrefixCls}-One-child`]} style={{padding:'0.2rem 0 0 0'}}>
			   				<div>章节数:{data.num}5</div>
			   				<div>总时长:{data.tims}</div>
			   			</div>
			   		</div>
			   		<div className={styles[`${PrefixCls}-Two`]}>
			   			<div style={{padding:'0.3rem'}}>
				   			<div>计划周期:{data.datas}</div>
				   			<div style={{padding:'0.2rem 0 0 0'}}>平均每日学习:{data.averageTime}</div>
				   		</div>
			   			<div >
			   				<div style={{color:'#00DB00',padding:'0 0.3rem 0 0'}}>进行中{data.connect}</div>
			   			</div>
			   		</div>
			   	</div>
   			))
   		}
   	</div>
   )
}

export default connect(({ loading, timetable }) => ({
  loading,
  timetable,
}))(Timetable);

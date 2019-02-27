import React from 'react';
import Rate from 'rc-rate'
import styles from './index.less'
import { getImages, getLocalIcon, handleBuildingClick } from 'utils'
import { Layout, WhiteSpace, Icon, List } from 'components'

const PrefixCls = 'comment'

class Comment extends React.Component { 
  render () {
    return (
      <div>
          {this.props.bannerDatas && this.props.bannerDatas.map((data, i) => (
            <div key={i} style={{background:'white',borderBottom:"solid 1px gainsboro",padding:'10px'}}>
							<div className={styles[`${PrefixCls}-comm`]}>
								<div className={styles[`${PrefixCls}-comm-fon`]}>
									<img src={getImages('', "de")} />
									{data.name}
								</div>
								<div>
								  <Rate style={{ fontSize: '16px' }} defaultValue={4} />
									<p style={{margin:'0'}}>
										{data.time}
									</p>
								</div>
							</div>
							<div className={styles[`${PrefixCls}-review`]}>
								{data.connect}
							</div>
            </div>
          ))}
      </div>
    );
  }
}

export default Comment
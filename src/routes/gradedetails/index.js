/**
 * @author Lowkey
 * @date 2018/10/26
 * @Description: 人比黄花瘦
 */
import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { WhiteSpace } from 'components'
import Nav from 'components/nav'
import { gradeRow } from 'components/row'
import styles from './index.less'

const PrefixCls = 'gradedetails'
const GradeDetails = ({ dispatch, gradedetails }) => {
  const { data } = gradedetails,
    handlerGradeClick = () => {
      dispatch(routerRedux.push({
        pathname: '/grade',
        query: {
          name: '评价',
        },
      }))
    },
    renderRight = () => {
      return (
        <div style={{ color: '#000' }} onClick={handlerGradeClick}>我要评价</div>
      )
    }
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title='评价' dispatch={dispatch} color='#fff' renderNavRight={renderRight()}/>
      <div>
        {
          cnIsArray(data) && data.map(item => (gradeRow(item)))
        }
      </div>
    </div>
  )
}
export default connect(({ loading, gradedetails }) => ({
  loading,
  gradedetails,
}))(GradeDetails)

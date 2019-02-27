import { connect } from 'dva'
import styles from './index.less'
import classNames from 'classnames'

const PrefixCls = 'WKC'

class RadioButton extends React.Component {
    render(){
    	return(
            <div onClick={this.props.Click} className={classNames(styles[`${PrefixCls}-sun`],{[styles.open]:this.props.yep})}>{this.props.label}</div>
        )
    }
}

export default RadioButton




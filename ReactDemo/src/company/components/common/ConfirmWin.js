/**
 * 弹窗组件
 */
import React, { Component, PropTypes } from 'react'
import Utils from 'company/common/Utils'

class ConfirmWin extends Component {
    close(event) {
        // 遮罩可否点击，default true
        if (typeof this.props.maskClickable === 'boolean' &&
            !this.props.maskClickable) {
            return false;
        }

        if (event.target.className === 'confirm_container') {
            Utils.closeConfirmWin()
        }
    }

    render() {
        const {title, content, btns} = this.props

        return(
            <div className="confirm_container" onClick={this.close.bind(this)} >
                <div className="confirm_win">
                    <div className="title">{title}</div>
                    <div className="content">{content}</div>
                    <div className="btns">
                        {
                            btns.map((btn, index) =>
                                <span className="btn" key={index}
                                    onClick={btn.handle} >{btn.text}</span>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmWin
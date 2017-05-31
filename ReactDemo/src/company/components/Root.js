/**
 * 根路由
 */
import React, { Component, PropTypes } from 'react'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from 'company/actions'
import * as Consts from 'company/common/Consts'
import Utils from 'company/common/Utils'

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import 'company/scss/anim.scss'

class Root extends Component {
    componentWillMount() {
        window.androidBack = () => {
            window.location = ''
        }

        this.initEntTypes()
        this.initEntIndustryTypes()
        this.initMarketPlateList()
        this.initCityList()
    }

    //
    initEntTypes() {
    }

    //
    initEntIndustryTypes() {
    }

    //
    initMarketPlateList() {
    }

    //
    initCityList() {
    }

    render() {
        return <div>
            {this.props.children}
        </div>
    }

    /*render() {
        return <div>
            <ReactCSSTransitionGroup
                component="div"
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
            </ReactCSSTransitionGroup>
        </div>
    }*/
}

function mapStateToProps(state) {
    return {
        common: state.common,
        search: state.search
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    // mapStateToProps,
    null,
    mapDispatchToProps
)(Root)
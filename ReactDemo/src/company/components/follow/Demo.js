import React, { Component, PropTypes } from 'react'
import { Link, hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Utils from 'company/common/Utils'
import Header from 'company/components/common/Header'
import Footer from 'company/components/common/Footer'
import * as Actions from 'company/actions'

class Demo extends Component {
    render() {
        const { common, actions, demo} = this.props

        const currHeader = {
            title: 'Demo',
            left: {
                show: true,
                handle: () => hashHistory.goBack()
            },
            right: {
                show: false
            }
        }

        const currFooter = {
            search: {
                show: true,
                light: false
            },
            input: {
                show: true,
                light: false
            },
            follow: {
                show: true,
                light: true
            }
        }

        return (
            <div>
                <Header currHeader={currHeader} />

                <div className={window.pthhClass}>
                    <section className="content_block">
                        
                    </section>
                </div>

                <Footer currFooter={currFooter} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        common: state.common,
        demo: state.demo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo)
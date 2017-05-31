/**
 * 
 */
import React, { Component, PropTypes } from 'react'
import { Link, hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Utils from 'company/common/Utils'
import Header from 'company/components/common/Header'
import * as Actions from 'company/actions'
import * as Consts from 'company/common/Consts'
import IScrollReact from 'company/components/common/IScrollReact'

class MyNeeds extends Component {
    constructor() {
        super()
        this.loadMyNeedList = this.loadMyNeedList.bind(this)
        this.page_index = 1
    }

    componentDidMount() {
        window.androidBack = () => {
            hashHistory.push('/follow')
        }

        this.loadMyNeedList()
    }

    loadMyNeedList(callback, type) {
        this.page_index = type === 1 ? 1 : this.page_index

        Utils.fetch({
            url: 'requirement/my_list',
            data: {
                page_index: this.page_index,
                page_size: Consts.PAGE_SIZE
            },
            sCallback: (data) => {
                if (data.item_list) {
                    this.page_index += 1
                    let myNeedList = type === 1 ? data.item_list : this.props.follow.myNeedList.concat(data.item_list)

                    callback && callback(data.item_list.length === 0)
                    this.props.actions.setMyNeedList(myNeedList)
                }
            }
        })
    }

    render() {
        console.log('MyNeeds render >>>>>>>>>>>>>>>>>>>>>>>>>>>')

        const { actions, follow} = this.props

        const currHeader = {
            title: '',
            left: {
                show: true,
                handle: () => hashHistory.push('/follow')
            },
            right: {
                show: false
            }
        }

        return (
            <div>
                <Header currHeader={currHeader} />

                <IScrollReact scrollCallback={this.loadMyNeedList}>
                    <section className="content_block">
                        {follow.myNeedList.map((item, index) => {
                            let edit = item.status == '3' ? 2 : 1
                            return (
                                <div key={index}
                                     className="row height40 grey14"
                                     onClick={() => {
                                        hashHistory.push(`/needDetails/${item.id}/${edit}`)}}
                                >
                                    <div className="row_left border-none">
                                        {item.name}
                                    </div>
                                    <div className="row_right">
                                        {Utils.dateFormat(item.ctime, 1)}{
                                            {"1": "SSS", "2": "DDD", "3": "FFF"}[item.status]
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                </IScrollReact>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        follow: state.follow
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
)(MyNeeds)
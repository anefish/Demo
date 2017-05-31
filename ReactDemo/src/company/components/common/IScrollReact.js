import 'company/scss/scroll.scss'
import IScroll from 'iscroll/build/iscroll-probe'
import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'

let IScrollReact = React.createClass({
    getInitialState: function() {
        return {
            pullDownStatus: 0,
            pullUpStatus: 0
        }
    },

    componentWillMount: function() {
        this.myScroll = null
        this.itemsChanged = false
        this.isTouching = false

        this.pullUpTips = {
            // 上拉状态
            0: '上滑加载更多...',
            1: '松开加载...',
            2: '加载中，请稍后...',
            3: '没有更多了...'
        }

        this.pullDownTips = {
            // 下拉状态
            0: '下拉刷新',
            1: '松开刷新',
            2: '加载中，请稍后...'
        }
    },

    componentDidMount: function() {
        this.myScroll = new IScroll('.iscroll-wrapper', {
            preventDefault: false,
            probeType: 3,
            mouseWheel: true
        })

        this.myScroll.on('scroll', this.onScroll )
        this.myScroll.on('scrollEnd', this.onScrollEnd )

        $('.iscroll-wrapper').css('top', $('header').height())
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        this.itemsChanged = nextProps.children !== this.props.children
        return true
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.itemsChanged) {
            this.myScroll.refresh()
        }
        return true
    },

    onTouchStart: function() {
        this.isTouching = true
        // console.log('onTouchStart...')
    },
 
    onTouchEnd: function() {
        this.isTouching = false
        // console.log('onTouchEnd...')
    },

    onScroll: function() {
        let wpH = $('.iscroll-wrapper').height(),
            bdH = $('.iscroll-body').height(),
            diffH = wpH - bdH,

            iScrollY = this.myScroll.y >> 0,
            tipH = $('.iscroll-pull-up').height(),
            changeH = 15

        // console.log('ReactDom: ', this.refs.iscrollWrapper.height)
        
        if (this.isTouching) {
            if (iScrollY < diffH) { //上滑
                // console.log('上滑。。。')

                if ((diffH - iScrollY) > changeH) {
                    this.setState({pullUpStatus: 1})
                } else {
                    this.setState({pullUpStatus: 0})
                }
            }

            if (iScrollY > 0) { //下拉
                // console.log('下拉。。。')

                if (iScrollY > tipH) {
                    this.setState({pullDownStatus: 1})
                } else {
                    this.setState({pullDownStatus: 0})
                }
            }
        }

    },

    onScrollEnd: function() {
        // console.log('onScrollEnd...')

        if (this.state.pullUpStatus === 1) {
            this.setState({pullUpStatus: 2})

            this.props.scrollCallback((noMore) => {
                console.log('更多：', noMore)

                if (noMore) {
                    this.setState({pullUpStatus: 3})
                } else {
                    this.setState({pullUpStatus: 0})
                }
            })
        }

        if (this.state.pullDownStatus === 1) {
            this.setState({pullDownStatus: 2})

            this.props.scrollCallback((noMore) => {
                this.setState({
                    pullDownStatus: 0,
                    pullUpStatus: 0
                })
                // console.log('更多：', noMore)
            }, 1)
        }
    },

    render: function() {
        return (
            <div className="iscroll-wrapper" ref="iscrollWrapper">
                <div className="iscroll-body" style={{minHeight: '101%'}} 
                    onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} >
                    <div className="iscroll-pull-down">
                        <i></i><span>{this.pullDownTips[this.state.pullDownStatus]}</span>
                    </div>

                    {this.props.children}

                    <div className="iscroll-pull-up ">
                        <i></i><span>{this.pullUpTips[this.state.pullUpStatus]}</span>
                    </div>
                </div>
            </div>
        )
    }
})

export default IScrollReact
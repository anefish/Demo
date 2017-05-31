import React, { PropTypes, Component } from 'react'
import { Link, hashHistory } from 'react-router'

class Footer extends Component {
    constructor(){
        super()
        this.handleClickSearch = this.handleClickSearch.bind(this)
        this.handleClickInput = this.handleClickInput.bind(this)
        this.handleClickFollow = this.handleClickFollow.bind(this)
    }

    handleClickSearch() {
        hashHistory.push('/search')
    }

    handleClickInput() {
        hashHistory.push('/inputSt1')

        let handle = this.props.currFooter.input.handle
        handle && handle()
    }

    handleClickFollow() {
        hashHistory.push('/follow')

    }

    render() {
        const footer = this.props.currFooter
        // const userMenu = this.props.userMenu

        const ftClass = {
            search: {
                show: footer.search.show ? "menu" : "hidden",
                icon: "icon search_icon" + (footer.search.light ? "_light" : ""),
                light: footer.search.light ? "light": ""
            },
            input: {
                show: footer.input.show ? "menu" : "hidden",
                icon: "icon input_icon" + (footer.input.light ? "_light" : ""),
                light: footer.input.light ? "light": ""
            },
            follow: {
                show: footer.follow.show ? "menu" : "hidden",
                icon: "icon follow_icon" + (footer.follow.light ? "_light" : ""),
                light: footer.follow.light ? "light": ""
            }
        }

        return (
            <footer className="footer">
                <div className={ftClass.search.show} onClick={this.handleClickSearch} >
                    <p className={ftClass.search.icon}></p>
                    <p className={ftClass.search.light}>查询</p>
                </div>

                <div className={ftClass.input.show} onClick={this.handleClickInput} >
                    <p className={ftClass.input.icon}></p>
                    <p className={ftClass.input.light}>录入</p>
                </div>

                <div className={ftClass.follow.show} onClick={this.handleClickFollow} >
                    <p className={ftClass.follow.icon}></p>
                    <p className={ftClass.follow.light}>跟踪</p>
                </div>
            </footer>
        )
    }
}

Footer.propTypes = {
    currFooter: React.PropTypes.object.isRequired
}

export default Footer
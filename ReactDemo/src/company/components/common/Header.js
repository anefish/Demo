import React, { PropTypes, Component } from 'react'

class Header extends Component {
    constructor() {
        super()
        this.handleLeft = this.handleLeft.bind(this)
        this.handleRight = this.handleRight.bind(this)
    }

    handleLeft() {
        const header = this.props.currHeader

        if (header.left.handle) {
            header.left.handle()
        }
    }

    handleRight() {
        const header = this.props.currHeader

        if (header.right.handle) {
            header.right.handle()
        }
    }

    render() {
        const header = this.props.currHeader
        const rightStyle = this.props.rightStyle

        const iconClass = {
            '0': 'icon-back',
            '1': 'icon-delete'
        }

        return (
            <header className="header">
                <section className={window.isiPhone ? 'ios_head' : 'hidden'}></section>

                <section className="dft_head">
                    <div className="header-left">
                        <a className={header.left.show ? "link" : "hidden"} href="javascript:;"
                            onClick={this.handleLeft}>
                            <i className="icon-back"></i>
                        </a>
                    </div>
                    <h1>{header.title}</h1>
                    <div className="header-right" style={rightStyle}>
                        <a className={header.right.show ? "link" : "hidden"} href="javascript:;"
                            onClick={this.handleRight}>
                            {header.right.icon ? <i className={iconClass[header.right.icon]}></i> : ''}
                            {header.right.text}
                        </a>
                    </div>
                </section>
            </header>
        )
    }
}

Header.propTypes = {
    currHeader: React.PropTypes.object.isRequired
}

export default Header

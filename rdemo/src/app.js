import React from 'react'
import {connect} from 'react-redux'
import {changeName, changeAge} from './actions'

class App extends React.Component{
    onChangeName(){
        this.props.dispatch(changeName(this.refs.name.value))
    }

    onChangeAge(type){
        this.props.dispatch(changeAge(type))
    }

    render(){
        var {name, age} = this.props

        return (
            <div>
                <div>{name}: {age}</div>
                <br />

                <input ref="name" />&nbsp;
                <input type="button" value="修改姓名" onClick={() => this.onChangeName()} />
                <br /><br />

                <input type="button" value="增加年龄" onClick={() => this.onChangeAge('+')} />
                &nbsp;
                <input type="button" value="减小年龄" onClick={() => this.onChangeAge('-')} />
            </div>
        )
    }
}

const select = (state) => {
    return state
}

const ConnectedApp = connect(select)(App)

export default ConnectedApp
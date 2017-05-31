import React, { Component, PropTypes } from 'react'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Root from './Root'
import Search from './search/Search'
import SearchInput from './search/SearchInput'
import FilterInput from './search/FilterInput'
import SearchFilterResult from './search/SearchFilterResult'
import NeedDetails from './search/NeedDetails'
import CompDetails from './search/CompDetails'
import FincInfo from './search/FincInfo'
import ShareholderInfo from './search/ShareholderInfo'
import ManagerInfo from './search/ManagerInfo'

import Follow from './follow/Follow'
import ProjectDetails from './follow/ProjectDetails'
import MyNeeds from './follow/MyNeeds'
import MyProjects from './follow/MyProjects'
import Login from './follow/Login'

import EntNameInput from './input/EntNameInput'
import InputStep1 from './input/InputStep1'
import InputStep2 from './input/InputStep2'
import InputStep3 from './input/InputStep3'

class App extends Component {
    render() {
        const indexRedirect = this.props.indexRedirect
        
        const routes = (
            <Route path="/" component={Root}>
                <IndexRedirect to={indexRedirect} />

                <Route path="/search" component={Search} />
                <Route path="/searchInput" component={SearchInput}/>
                <Route path="/filterInput" component={FilterInput}/>
                <Route path="/searchFilterResult/:fromType/:scode/:sname" component={SearchFilterResult}/>
                <Route path="/needDetails/:id/:my" component={NeedDetails}/>
                <Route path="/compDetails/:id" component={CompDetails}/>
                <Route path="/fincInfo" component={FincInfo}/>
                <Route path="/shareholderInfo" component={ShareholderInfo}/>
                <Route path="/managerInfo" component={ManagerInfo}/>

                <Route path="/follow" component={Follow} />
                <Route path="/projectDetails/:id" component={ProjectDetails} />
                <Route path="/myNeeds" component={MyNeeds} />
                <Route path="/myProjects" component={MyProjects} />
                <Route path="/login" component={Login} />


                <Route path="/entNameInput" component={EntNameInput} />
                <Route path="/inputSt1" component={InputStep1} />
                <Route path="/inputSt2" component={InputStep2} />
                <Route path="/inputSt3" component={InputStep3} />
            </Route>
        )

        return (
            <Router routes={routes} history={hashHistory} >
            </Router>
        )
    }
}

// export default App

export default connect()(App)
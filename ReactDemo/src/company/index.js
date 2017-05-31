import 'normalize.css';
import './scss/index.scss';

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import md5 from 'md5'

import * as Actions from 'company/actions'
import * as Consts from 'company/common/Consts'
import Utils from 'company/common/Utils'

import App from './components/App';
import configureStore from './store/configureStore'

const store = configureStore()

render(
    <Provider store={store}>
        <App indexRedirect={'abc'} />
    </Provider>,
    document.getElementById('root')
)
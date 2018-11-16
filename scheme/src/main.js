import Vue from 'vue'
import './assets/theme/index.css'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
// import router from './router'

import Web3 from 'web3'
import abi from '@/assets/abi.js'
if (typeof window.web3 !== 'undefined') {
  const web3 = new Web3(Web3.givenProvider)
  const address = '0x2DB82312880622A92d9Fd5394A2BdA0F6c9f8ec9'
  const contractInstance = new web3.eth.Contract(abi, address)
  window.contractInstance = contractInstance
  window.web3 = web3

  // web3.eth.getAccounts().then((accounts) => {
  //   console.log(accounts)
  // })
} else {
  // 提示用户安装 MetaMask
}

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
})

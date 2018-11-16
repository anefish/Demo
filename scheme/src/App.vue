<template>
  <div id="app">
    <div class="header">
      <div class="logo" @click="reload">
        Utopia
      </div>
      <div class="help" @click="dialogHelpVisible = true">
        帮助
      </div>
    </div>
    <div class="main">
      <!-- <router-view/> -->
      <index/>
    </div>
    <div class="footer">
      © 2018 Utopia. All Rights Reserved.
      <span class="contract" @click="goContract">智能合约</span>
    </div>

    <el-dialog title="规则说明" :visible.sync="dialogHelpVisible" custom-class="help-dialog">
      <p>1. UT为契约单位，1UT = 0.001ETH 恒定不变。</p>
      <p>2. 每个账户最多可以购买10000UT，即10ETH。</p>
      <p>3. 返佣比例根据购买总额计算，例如：购买总额为10ETH，返佣比例为50%；购买总额为5ETH，返佣比例为25%，以此类推。
        被邀请人购买契约，邀请人将直接按照返佣比例获得奖金。</p>
      <p>4. 每个账户拥有5次免费（即无论是否购买了契约）获得1%返佣奖励的机会。</p>
      <p>5. 邀请有奖，每邀请1人绑定账户，奖励10UT。</p>
      <p>6. 定期分红与抽奖（同步进行），奖池为待分红奖金总额。</p>
      <p>7. 奖池50%用于分红，根据账户所持UT全体参与；45%用于抽奖；5%分配平台。</p>
      <p>8. 幸运抽奖：在购买总额>=2ETH的账户中随机抽取3名幸运账户（不限重复），其中购买总额>=2ETH奖励金额为奖池5%；
        购买总额>=4ETH奖励金额为奖池10%；购买总额>=8ETH奖励金额为奖池15% 。如有剩余，自动累加至下次分红抽奖奖池。</p>
      <p>9. 账户可随时提现，每次提现金额为全部待提现收益。</p>
      <p>10. 账户可注销：当收益总额小于购买总额，且奖池余额足够时，注销账户合约会自动将“购买总额 - 已提现”金额返还账户。
        注销后此账户将不能重新参与游戏。</p>
      <p>11. 所有规则均有智能合约控制完成，公开透明，公平公正。</p>
    </el-dialog>
  </div>
</template>

<script>
import Index from '@/components/Index'

export default {
  name: 'App',
  data () {
    return {
      dialogHelpVisible: false
    }
  },
  mounted () {},
  methods: {
    reload () {
      // window.location.reload()
      window.location.href = window.location.origin
    },
    goContract () {
      window.open('https://etherscan.io/address/0x2db82312880622a92d9fd5394a2bda0f6c9f8ec9', '_blank')
    }
  },
  components: {
    Index
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background: #000;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  background-color: rgb(52, 58, 64) !important;
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  font-weight: bold;
  height: 80px;
  padding: 0 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
}
.footer {
  background-color: rgb(52, 58, 64) !important;
  color: rgb(255, 255, 255);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  margin-top: 80px;
  padding-bottom: 60px;
}

.header .logo, .help {
  cursor: pointer;
  height: 80px;
  line-height: 80px;
}
.header .help {
  font-weight: normal;
  font-size: 18px;
}

.footer .contract {
  margin-left: 20px;
  font-size: 14px;
  cursor: pointer;
}

.el-tabs__item {
  font-size: 16px;
}
.el-tabs--border-card {
  background: none;
}
.el-tabs--border-card>.el-tabs__header {
  background: none;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):not(.is-active):hover {
    color: #fff;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    background-color: #dcdfe6;
    color: #000;
}
.el-tabs--border-card {
  border-radius: 4px;
  overflow: hidden;
}
.el-input-group__prepend, .el-input-group__append {
  font-weight: bold;
}

.help-dialog {
  line-height: 2;
  width: 70%;
}
</style>

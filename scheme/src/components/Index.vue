<template>
  <div class="index-container">
    <div class="summary">
      <!-- <p class="title subtitle">理想乐园</p> -->
      <p class="title">理想乐园</p>
      <p class="total">
        <span>{{toEth(buyAmountTotal)}} ETH</span>
      </p>

      <el-button type="info" class="buy-one" @click="buyOne">
        <div class="">
          <span class="one">1 UT</span>
          <span>{{tips[tipIndex]}}</span>
        </div>
      </el-button>
    </div>

    <div class="detail">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-tabs type="border-card">
            <el-tab-pane label="购买">
              <div v-show="!user.addr" class="sign">
                <el-input placeholder="请输入邀请码" v-model="parentCode">
                  <template slot="prepend">邀请码</template>
                </el-input>
                <el-button class="sign-btn" type="info" @click="sign">绑定账户</el-button>
              </div>
              <!-- <br> -->
              <div class="buy">
                <el-input placeholder="" v-model="buyUT" type="number" min="1" max="10000" @blur="blurBuyUT">
                  <template slot="prepend">UT</template>
                  <template slot="append">@ {{buyEthAmount}}ETH</template>
                </el-input>

                <div class="buy-btns">
                  <el-button-group class="buy-amounts">
                    <el-button class="amount" type="info" @click="buyMore(1)">+1 UT</el-button>
                    <el-button class="amount" type="info" @click="buyMore(10)">+10</el-button>
                    <el-button class="amount" type="info" @click="buyMore(100)">+100</el-button>
                    <el-button class="amount" type="info" @click="buyMore(1000)">+1000</el-button>
                  </el-button-group>
                  <el-button class="buy-btn" type="info" @click="buy">发送ETH</el-button>
                </div>
              </div>
              <!-- <div class="rule">
                规则说明
              </div> -->
            </el-tab-pane>
            <el-tab-pane label="账户">
              <p>我的账户<span v-show="exited">（已注销）</span>：{{user.addr || '--'}}</p>
              <p>购买总额：{{toEth(user.buyAmount) || '--'}} ETH</p>
              <p>返佣比例：{{rateRaw || '--'}} %</p>
              <p>UT总额：{{utCount || '--'}} UT</p>
              <p>免费奖励次数：{{user.freeRewardCount || '0'}}</p>
              <br>
              <p>收益总额：{{toEth(user.userRewardTotal) || '--'}} ETH</p>
              <p>已提现：{{toEth(user.userWithdrawTotal) || '--'}} ETH</p>
              <p class="large">待提现：{{unWithdrawTotal || '--'}} ETH</p>
              <!-- <br> -->
              <el-button type="info" class="withdraw" @click="withdraw">提现</el-button>
              <br>
              <el-button type="info" class="withdraw" @click="safeExit">注销</el-button>
            </el-tab-pane>
            <el-tab-pane label="推广">
              <p class="large">我的邀请码：{{user.code || '--'}}</p>
              <p>我的邀请链接：{{inviteLink || '--'}}</p>
              <p>我的推荐人：{{user.parentCode || '--'}}</p>
              <p>我的邀请人数：{{user.invite || '--'}}</p>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12">
          <el-tabs type="border-card">
            <el-tab-pane label="概览">
              <p>全平台购买总额：{{toEth(buyAmountTotal) || '--'}} ETH</p>
              <p>已发放奖金总额：{{toEth(awardAmountTotal) || '--'}} ETH</p>
              <p class="large">待分红奖金总额：{{toEth(buyAmountTotal - awardAmountTotal)}} ETH</p>
            </el-tab-pane>
            <el-tab-pane label="分红">
              <p>本次全体分红总额：{{toEth(allBonus)}} ETH</p><br>

              <p>本次幸运抽奖结果</p>
              <p>获奖地址1：{{lucy.lucyer0 || '--'}}</p>
              <p>获奖金额：{{toEth(lucy.lucyBonus0) || '--'}} ETH</p>
              <p>获奖地址2：{{lucy.lucyer1 || '--'}}</p>
              <p>获奖金额：{{toEth(lucy.lucyBonus1) || '--'}} ETH</p>
              <p>获奖地址3：{{lucy.lucyer2 || '--'}}</p>
              <p>获奖金额：{{toEth(lucy.lucyBonus2) || '--'}} ETH</p>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      address0: '0x0000000000000000000000000000000000000000',
      account: '',
      user: {},
      buyAmountTotal: '0',
      awardAmountTotal: '0',
      allBonus: 0,
      lucy: {},

      parentCode: '',
      buyUT: 1,
      utOfEthRate: 1000,

      exited: false,

      tips: [
        '最高可获得50%返佣比例',
        '购买越多，返佣比例越高',
        '5次免费获得1%返佣的机会',
        '返佣奖励即时分配',
        '邀请1人绑定账户奖励10UT',
        'UT越多，分红越多',
        '购买2ETH以上即可参与幸运抽奖',
        '幸运抽奖最高可获得奖池15%的奖金',
        '抽奖不限重复，一个账户有多次机会中奖',
        '无需争抢最后一名，随机抽奖全凭运气',
        '收益可以随时提现',
        '账户可以注销并收回成本'
      ],
      tipIndex: 0
    }
  },
  computed: {
    buyEthAmount () {
      return (1 / this.utOfEthRate * this.buyUT).toFixed(3)
    },
    utCount () {
      return Math.round(this.toEth(this.user.buyAmount) * this.utOfEthRate + Number(this.user.invite) * 10) || '0'
    },
    rateRaw () {
      return Number(this.user.rate) ? (1 / Number(this.user.rate) * 100).toFixed(3) : '0'
    },
    inviteLink () {
      return this.user.code ? `${window.location.origin}?i=${this.user.code}` : '--'
    },
    unWithdrawTotal () {
      const unWithdrawTotal = this.toEth(this.user.userRewardTotal - this.user.userWithdrawTotal)
      return unWithdrawTotal > 0 ? unWithdrawTotal : '0'
    }
  },
  mounted () {
    this.showTips()
    this.getParentCode()
    this.init()
  },
  methods: {
    getQueryString (name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      const r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    startBuy () {
      let start = new Date()
      start.setMonth(9)
      start.setDate(7)
      start.setHours(20)
      start.setMinutes(0)
      start.setSeconds(0)

      return new Date() > start
    },
    showTips () {
      setInterval(() => {
        if (this.tipIndex === this.tips.length - 1) {
          this.tipIndex = 0
        } else {
          this.tipIndex += 1
        }
      }, 6000)
    },
    getParentCode () {
      const parentCode = this.getQueryString('i')
      if (!isNaN(parentCode)) {
        this.parentCode = parentCode
      }
    },
    toWei (_eth) {
      _eth = _eth ? String(_eth) : '0'
      return window.web3.utils.toWei(_eth, 'ether')
    },
    toEth (_wei) {
      if (!window.web3) {
        return '0'
      }
      _wei = _wei ? String(_wei) : '0'
      if (Number(_wei) === 0) {
        return '0'
      }

      // return Number(window.web3.utils.fromWei(_wei, 'ether')).toFixed(6)
      return Number(window.web3.utils.fromWei(_wei, 'ether'))
    },
    init () {
      if (typeof window.web3 === 'undefined') {
        this.$notify({
          title: '温馨提示',
          message: '请安装MetaMask.',
          type: 'warning'
        })
        return false
      }

      window.web3.eth.getAccounts().then((accounts) => {
        if (accounts.length === 0) {
          this.$notify({
            title: '温馨提示',
            message: '请登录MetaMask.',
            type: 'warning'
          })
          return false
        }

        this.account = accounts[0]
        this.isExit()
        this.getUser()
        this.getBuyAmountTotal()
        this.getAwardAmountTotal()
        this.getAllBonus()
        this.getLucy()
      })
    },

    isExit () {
      window.contractInstance.methods.isExit().call({
        from: this.account
      }).then((exited) => {
        this.exited = exited
      })
    },
    getUser () {
      window.contractInstance.methods.getUser().call({
        from: this.account
      }).then((user) => {
        if (user.addr === this.address0) {
          return false
        }
        // console.log(user)
        this.user = user
      })
    },
    getBuyAmountTotal () {
      window.contractInstance.methods.buyAmountTotal().call().then((buyAmountTotal) => {
        // console.log(buyAmountTotal)
        this.buyAmountTotal = buyAmountTotal
      })
    },
    getAwardAmountTotal () {
      window.contractInstance.methods.awardAmountTotal().call().then((awardAmountTotal) => {
        this.awardAmountTotal = awardAmountTotal
      })
    },
    getAllBonus () {
      window.contractInstance.methods.getAllBonus().call().then((allBonus) => {
        this.allBonus = allBonus
      })
    },
    getLucy () {
      window.contractInstance.methods.getLucy().call().then((lucy) => {
        if (lucy.lucyer0 === this.address0) {
          return false
        }
        // console.log(lucy)
        this.lucy = lucy
      })
    },

    sign () {
      if (!this.account) {
        this.$message.warning('请登录MetaMask.')
        return false
      }

      if (!this.parentCode) {
        this.$message.warning('请输入邀请码')
        return false
      }

      window.contractInstance.methods.sign(this.parentCode).send({
        from: this.account
      }).then((result) => {
        // console.log(result)
        this.init()
      })
    },
    buy () {
      if (!this.account) {
        this.$message.warning('请登录MetaMask.')
        return false
      }

      if (!this.user.addr) {
        this.$message.warning('请绑定账户.')
        return false
      }

      if (!this.startBuy()) {
        this.$message.warning('2018.10.07 20:00:00 开放购买.')
        return false
      }

      if (this.exited) {
        this.$message.warning('当前账户已注销.')
        return false
      }

      const canBuyEth = 10 - this.toEth(this.user.buyAmount)
      const canBuyUT = canBuyEth * this.utOfEthRate
      if (Number(this.buyEthAmount) > canBuyEth) {
        this.$message.warning(`您最多还能购买${canBuyUT} UT (${canBuyEth} ETH).`)
        return false
      }

      window.contractInstance.methods.buy().send({
        from: this.account,
        value: this.toWei(this.buyEthAmount)
      }).then((result) => {
        // console.log(result)
        this.init()
      })
    },
    buyOne () {
      this.buyUT = 1
      this.buy()
    },
    buyMore (addUT) {
      this.buyUT += addUT
    },
    blurBuyUT () {
      this.buyUT = Math.floor(this.buyUT)
    },

    withdraw () {
      if (!this.account) {
        this.$message.warning('请登录MetaMask.')
        return false
      }

      if (!this.user.addr) {
        this.$message.warning('请绑定账户.')
        return false
      }

      if (this.exited) {
        this.$message.warning('当前账户已注销.')
        return false
      }

      if (this.unWithdrawTotal <= 0) {
        this.$message.warning('暂无可提现金额.')
        return false
      }

      window.contractInstance.methods.safeWithdrawal().send({
        from: this.account
      }).then((result) => {
        // console.log(result)
        this.init()
      })
    },
    safeExit () {
      if (!this.account) {
        this.$message.warning('请登录MetaMask.')
        return false
      }

      if (!this.user.addr) {
        this.$message.warning('请绑定账户.')
        return false
      }

      if (this.exited) {
        this.$message.warning('当前账户已注销.')
        return false
      }

      if (this.toEth(this.user.userRewardTotal) >= this.toEth(this.user.buyAmount)) {
        this.$message.warning('收益覆盖成本.')
        return false
      }

      const amount = this.toEth(this.user.buyAmount) - this.toEth(this.user.userWithdrawTotal)
      const unAwardAmountTotal = this.toEth(this.buyAmountTotal) - this.toEth(this.awardAmountTotal) +
        (this.toEth(this.user.userRewardTotal) - this.toEth(this.user.userWithdrawTotal))
      if (amount > unAwardAmountTotal) {
        this.$message.warning('可用资金不足.')
        return false
      }

      window.contractInstance.methods.safeExit().send({
        from: this.account
      }).then((result) => {
        // console.log(result)
        this.init()
      })
    }
  }
}
</script>

<style scoped>
.index-container {
  color: #fff;
}
.summary {
  text-align: center;
  padding: 40px 80px;
}
.summary .title {
  font-size: 72px;
  font-weight: 300;
  color: rgba(255, 255, 255, .7);
}
.summary .subtitle {
  font-size: 54px;
}
.summary .total {
  color: #fff;
  font-size: 80px;
  font-weight: bolder;
  /* text-shadow: 0 0 5px #000000; */
}
.summary .buy-one {
  -webkit-animation: pulse-data-v-1c5d7958 2s ease infinite;
  -webkit-transition: -webkit-box-shadow .6s;
  animation: pulse-data-v-1c5d7958 2s ease infinite;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 30px;
  padding: 1rem;
  transition: -webkit-box-shadow .6s;
  transition: box-shadow .6s;
  transition: box-shadow .6s,-webkit-box-shadow .6s;
  white-space: normal;
  width: 100%;
  /* background: rgba(255, 255, 255, 0.7);
  color: rgba(0, 0, 0, .7); */
}
.buy-one .one {
  float: left;
}
.detail {
  margin: 20px 80px 50px 80px;
  line-height: 2;
}
.detail .sign {
  margin-bottom: 50px;
}
.sign .sign-form {
  display: flex;
  align-items: center;
}
.sign-form .label {
  display: inline-block;
  width: 70px;
}
.sign .parent-code {
  flex: 1;
}
.sign .sign-btn {
  width: 100%;
  margin-top: 20px;
}
.buy-form {
  display: flex;
}
.buy-from .val {
  flex: 1;
}
.buy-form .unit {
  border: 0;
  background: none;
  color: #fff;
  font-size: 18px;
}
.buy-btns {
  margin-top: 10px;
}
.buy-btns .buy-amounts {
  display: flex;
}
.buy-amounts .amount {
  flex: 1;
}
.buy-btns .buy-btn {
  margin-top: 20px;
  width: 100%;
}

.rule {
  margin-top: 30px;
}

.invites {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.withdraw {
  width: 100%;
  margin-top: 20px;
}
.large {
  font-weight: bold;
  font-size: 20px;
}
</style>

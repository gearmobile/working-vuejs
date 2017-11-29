import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  USD_Balance: 1000,
  BTC_Balance: 0,
  Last_Price: 10000,
  Last_Price_Percent: 10,
  MinSum: 100,
  Orders: [],
  mask: '######',
  commission: {
    totalValue: 0,
    percent: 1
  }
}

const getters = {
  getMask (state) {
    return state.mask
  },
  getOrders (state) {
    return state.Orders
  },
  getCurrBTCSumm (state) {
    return (id) => {
      return state.Orders.find((el, index) => {
        if (index === id) {
          return el
        }
      })
    }
  },
  getLastPrice (state) {
    return state.Last_Price
  },
  deltaLastPrice (state) {
    const percent = (state.Last_Price * state.Last_Price_Percent) / 100
    const precentMaxLevel = state.Last_Price + percent
    const precentMinLevel = state.Last_Price - percent
    return [precentMinLevel, precentMaxLevel]
  }
}

const mutations = {
  'SET_LAST_PRICE' (state, payload) {
    state.Last_Price = Number(payload)
  },
  'ON_BUY' (state, payload) {
    state.Orders.push(payload)
  },
  'ON_SELL' (state, payload) {
    state.Orders.splice(payload.id, 1)
  },
  'SET_COMMISION' (state, payload) {
    state.commission.totalValue += payload
  }
}

const actions = {
  getCommission ({ commit }, payload) {
    commit('SET_COMMISION', payload)
  },
  setLastPrice ({ commit }, payload) {
    commit('SET_LAST_PRICE', payload)
  },
  onBuy ({ commit, getters, dispatch }, payload) {
    const price = getters.getLastPrice
    const summ = Number(payload)
    const btcSumm = summ / price
    if (price < getters.deltaLastPrice[0] || price > getters.deltaLastPrice[1]) {
      alert('Цена не должна отличаться более чем на 10% от последней цены')
      return
    }
    if (payload < state.MinSum) {
      alert('Минимальная сумма покупки -  $100')
      return
    }
    if (state.USD_Balance < summ) {
      alert('Недостаточно средств для покупки!')
      return
    }
    if (state.USD_Balance >= summ) {
      const fee = (summ * state.commission.percent) / 100
      state.USD_Balance -= (summ + fee)
      state.Last_Price = price
      state.BTC_Balance += btcSumm
      dispatch('getCommission', fee)
    }
    commit('ON_BUY', { usd_summ: summ, btc_price: price, btc_summ: btcSumm })
  },
  onSell ({ commit, getters }, payload) {
    const currBTCSumm = getters.getCurrBTCSumm(payload.id).btc_summ
    const currUSDSumm = currBTCSumm * getters.getLastPrice
    state.USD_Balance += currUSDSumm
    state.BTC_Balance -= currBTCSumm
    commit('ON_SELL', payload)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

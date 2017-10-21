import Vue from 'vue'
import Vuex from 'vuex'
import isEmpty from '../utils/isEmpty'

Vue.use(Vuex)

const state = {
  mask: '#########',
  maskOpening: '##',
  hintText: 'Целые числа',
  masonry: [
    { name: 'Кладка в 0,5 кирпича', value: '0.5' },
    { name: 'Кладка в 1 кирпич', value: '1' },
    { name: 'Кладка в 1,5 кирпича', value: '1.5' },
    { name: 'Кладка в 2 кирпича', value: '2' },
    { name: 'Кладка в 2,5 кирпича', value: '2.5' }
  ],
  seam: [
    { name: 'Без учета растворного шва', value: 0 },
    { name: 'С учетом растворного шва толщиной 5 мм', value: 5 },
    { name: 'С учетом растворного шва толщиной 10 мм', value: 10 },
    { name: 'С учетом растворного шва толщиной 15 мм', value: 15 },
    { name: 'С учетом растворного шва толщиной 20 мм', value: 20 }
  ],
  bricks: [
    { name: 'Одинарный (250×120×65 мм)', value: 'одинарный', length: 250, width: 120, height: 65, price: 7 },
    { name: 'Полуторный (250×120×88 мм)', value: 'полуторный', length: 250, width: 120, height: 88, price: 14 },
    { name: 'Двойной (250×120×140 мм)', value: 'двойной', length: 250, width: 120, height: 140, price: 21 },
    { name: 'ЕВРО (250×85×65 мм)', value: 'ЕВРО', length: 250, width: 85, height: 65, price: 28 }
  ],
  building: {
    length: null,
    width: null,
    height: null
  },
  opening: [
    { width: null, height: null }
  ],
  areaOpening: 0,
  order: {
    masonry: '0.5',
    brick: 'одинарный',
    seam: 0
  }
}

const mutations = {
  'SET_MASONRY' (state, payload) {
    state.order.masonry = payload
  },
  'SET_SEAM' (state, payload) {
    state.order.seam
  },
  'SET_BRICK' (state, payload) {
    state.order.brick
  },
  'SET_LENGTH' (state, payload) {
    state.building.length = payload
  },
  'SET_WIDTH' (state, payload) {
    state.building.width = payload
  },
  'SET_HEIGHT' (state, payload) {
    state.building.height = payload
  },
  'ADD_COMPONENT' (state) {
    if (state.opening.length < 10) {
      state.opening.push({
        width: null,
        height: null
      })
    }
  },
  'REMOVE_COMPONENT' (state, payload) {
    if (state.opening.length > 1) {
      state.opening.splice(payload, 1)
    }
  },
  'SET_OPENING_WIDTH' (state, payload) {
    state.opening[payload.index].width = payload.value
  },
  'SET_OPENING_HEIGHT' (state, payload) {
    state.opening[payload.index].height = payload.value
  }
}

const actions = {
  setMasonry ({ commit }, payload) {
    commit('SET_MASONRY', payload)
  },
  setSeam ({ commit }, payload) {
    commit('SET_SEAM', payload)
  },
  setBrick ({ commit }, payload) {
    commit('SET_BRICK', payload)
  },
  setLength ({ commit }, payload) {
    commit('SET_LENGTH', payload)
  },
  setWidth ({ commit }, payload) {
    commit('SET_WIDTH', payload)
  },
  setHeight ({ commit }, payload) {
    commit('SET_HEIGHT', payload)
  },
  addComponent ({ commit }) {
    commit('ADD_COMPONENT')
  },
  removeComponent ({ commit }, payload) {
    commit('REMOVE_COMPONENT', payload)
  },
  setOpeningWidth ({ commit }, payload) {
    commit('SET_OPENING_WIDTH', payload)
  },
  setOpeningHeight ({ commit }, payload) {
    commit('SET_OPENING_HEIGHT', payload)
  }
}

const getters = {
  getMasonry (state) {
    return state.masonry
  },
  getMasonryCurrent (state) {
    return state.order.masonry
  },
  getSeam (state) {
    return state.seam
  },
  getSeamCurrent (state) {
    return state.order.seam
  },
  getBrick (state) {
    return state.bricks
  },
  getBrickCurrent (state) {
    return state.order.brick
  },
  getBuildingLength (state) {
    return state.building.length
  },
  getBuildingWidth (state) {
    return state.building.width
  },
  getBuildingHeight (state) {
    return state.building.height
  },
  getMask (state) {
    return state.mask
  },
  getMaskOpening (state) {
    return state.maskOpening
  },
  getOpening (state) {
    return state.opening
  },
  getOpeningWidth (state) {
    return (id) => {
      return state.opening[id].width
    }
  },
  getOpeningHeight (state) {
    return (id) => {
      return state.opening[id].height
    }
  },
  getAreaOpening (state) {
    return state.opening.reduce((total, currentIndex) => {
      return total + isEmpty(currentIndex.width) * isEmpty(currentIndex.height)
    }, 0)
  },
  getHintText (state) {
    return state.hintText
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store

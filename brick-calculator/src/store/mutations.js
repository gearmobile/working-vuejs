import { i18n } from '../pluigns/vue-i18n'

const mutations = {
  'SET_LANGUAGE' (state, payload) {
    i18n.locale = !payload ? state.language.language : state.language.secondary
    state.language.status = payload
  },
  'SET_MASONRY' (state, payload) {
    state.order.masonry = payload
  },
  // SEAM SECTION
  'SET_SEAM' (state, payload) {
    state.order.seam = payload
  },
  'RESET_SEAM_VALUE' (state) {
    state.order.seam = 0
  },
  // BRICK SECTION
  'SET_BRICK' (state, payload) {
    state.order.brick = payload
  },
  'RESET_BRICK_VALUE' (state) {
    state.order.brick = 'одинарный'
  },
  // BUILDING SECTION
  'SET_LENGTH' (state, payload) {
    if (payload === '') {
      state.building.length = null
    } else {
      state.building.length = payload
    }
  },
  'SET_WIDTH' (state, payload) {
    if (payload === '') {
      state.building.width = null
    } else {
      state.building.width = payload
    }
  },
  'SET_HEIGHT' (state, payload) {
    if (payload === '') {
      state.building.height = null
    } else {
      state.building.height = payload
    }
  },
  // OPENING SECTION
  'ADD_COMPONENT' (state) {
    if (state.opening.length < state.openingValueMax) {
      state.openingValueMaxStatus = false
      state.openingText = ''
      state.opening.push({
        width: null,
        height: null
      })
    } else {
      state.openingValueMaxStatus = true
      state.openingText = 'Вы добавили максимальное количество проемов'
    }
  },
  'REMOVE_COMPONENT' (state, payload) {
    if (state.opening.length > state.openingValueMin) {
      state.openingValueMaxStatus = false
      state.openingText = ''
      state.opening.splice(payload, 1)
    } else {
      state.openingValueMaxStatus = true
      state.openingText = 'Последний проем удалить нельзя'
    }
  },
  'SET_OPENING_WIDTH' (state, payload) {
    if (payload.value === '') {
      state.opening[payload.index].width = null
    } else {
      state.opening[payload.index].width = payload.value
    }
  },
  'SET_OPENING_HEIGHT' (state, payload) {
    if (payload.value === '') {
      state.opening[payload.index].height = null
    } else {
      state.opening[payload.index].height = payload.value
    }
  },
  'CLOSE_ALERT' (state) {
    state.openingValueMaxStatus = false
  },
  'RESET_OPENING_FIELDS' (state) {
    const arr = state.opening
    if (arr.length > 1) {
      for (let el of arr) {
        arr.splice(arr.findIndex(el), 1)
      }
    }
    for (let el of arr) {
      el.width = null
      el.height = null
    }
  }
}

export default mutations

import _ from 'lodash'
import isEmpty from '../utils/isEmpty'

const getters = {
  getLanguage (state) {
    return state.language.status
  },
  // MASONRY SECTION
  getMasonry (state) {
    return state.masonry
  },
  getMasonryCurrent (state) {
    return state.order.masonry
  },
  // SEAM SECTION
  getSeam (state) {
    return state.seam
  },
  getSeamCurrent (state) {
    return state.order.seam
  },
  // BRICK SECTION
  getBrick (state) {
    return state.bricks
  },
  getBrickCurrent (state) {
    return state.order.brick
  },
  // BUILDING SECTION
  getBuildingLength (state) {
    return state.building.length
  },
  getBuildingWidth (state) {
    return state.building.width
  },
  getBuildingHeight (state) {
    return state.building.height
  },
  checkFieldsBuilding (state) {
    return state.building.width !== null && state.building.height !== null && state.building.length !== null
  },
  // MASK SECTION
  getMask (state) {
    return state.mask
  },
  getMaskCounter (state) {
    return state.mask.length
  },
  getMaskOpening (state) {
    return state.maskOpening
  },
  // OPENING SECTION
  getOpeningText (state) {
    return state.openingText
  },
  getOpeningStatus (state, getters) {
    return state.openingValueMaxStatus || getters.checkCommonLess
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
  checkFieldsOpening (state) {
    return state.opening.every(el => {
      return el.height !== null && el.width !== null
    })
  },
  // CALCULATIONS SECTION
  getSelectedBrick (state) {
    const result = _.find(state.bricks, { 'value': state.order.brick })
    return result
  },
  getSeamWidth (state) {
    return state.order.seam / 1000
  },
  getSquareLengthHeight (state, getters) {
    const result = (getters.getSelectedBrick.length / 1000 + getters.getSeamWidth) * (getters.getSelectedBrick.height / 1000 + getters.getSeamWidth)
    return result
  },
  getSquareWidthHeight (state, getters) {
    const result = (getters.getSelectedBrick.width / 1000 + getters.getSeamWidth) * (getters.getSelectedBrick.height / 1000 + getters.getSeamWidth)
    return result
  },
  // OUTPUT SECTION
  getBricksQuantity (state, getters) {
    let result = null
    switch (state.order.masonry) {
      case '0.5':
        result = Math.ceil(1 / getters.getSquareLengthHeight)
        break
      case '1':
        result = Math.ceil(1 / getters.getSquareWidthHeight)
        break
      case '1.5':
        result = Math.ceil(1 / getters.getSquareLengthHeight) + Math.ceil(1 / getters.getSquareWidthHeight)
        break
      case '2':
        result = (Math.ceil(1 / getters.getSquareWidthHeight)) * 2
        break
      case '2.5':
        result = Math.ceil(1 / getters.getSquareLengthHeight) + (Math.ceil(1 / getters.getSquareWidthHeight)) * 2
        break
    }
    result = (getters.getAreaCommon - getters.getAreaOpening) * result
    return result
  },
  getAreaCommon (state, getters) {
    if (_.isNil(state.building.length) && _.isNil(state.building.width) && _.isNil(state.building.height)) {
      return null
    }
    const result = ((_.toNumber(state.building.length) + _.toNumber(state.building.width)) * 2) * _.toNumber(state.building.height)
    return result
  },
  getAreaOpening (state) {
    return state.opening.reduce((total, currentIndex) => {
      return total + isEmpty(currentIndex.width) * isEmpty(currentIndex.height)
    }, 0)
  },
  checkCommonLess (state, getters) {
    const common = getters.getAreaCommon === null ? 0 : getters.getAreaCommon
    if (common !== 0 && common / 2 <= getters.getAreaOpening) {
      state.openingText = 'Площадь проемов не должна превышать общую площадь строения'
      return true
    } else {
      state.openingText = ''
      return false
    }
  },
  getBricksCost (state, getters) {
    return getters.getBricksQuantity * getters.getSelectedBrick.price
  }
}

export default getters

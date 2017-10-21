import _ from 'lodash'
export default (value) => {
  return _.isNull(value) ? 0 : _.toNumber(value)
}

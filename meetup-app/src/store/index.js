import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

const state = {
  meetups: [],
  users: [],
  loading: false,
  authenticationError: {}
}

const mutations = {
  'INIT_MEETUPS' (state, payload) {
    state.meetups = payload
  },
  'CREATE_NEW_MEETUP' (state, payload) {
    state.meetups.push(payload)
  },
  'CREATE_NEW_USER' (state, payload) {
    const newUser = {
      id: payload.uid,
      meetups: []
    }
    state.users = newUser
  },
  'SET_LOADING' (state, payload) {
    state.loading = payload
  },
  'SET_ERROR' (state, payload) {
    state.authenticationError = payload
  },
  'CLEAR_ERROR' (state) {
    state.authenticationError = {}
  },
  'SET_USER' (state, payload) {
    state.users = payload
  }
}

const actions = {
  loadMeetupsFromFirebase ({ commit }) {
    commit('SET_LOADING', true)
    firebase.database().ref('meetups').once('value')
      .then(response => {
        const meetups = []
        const obj = response.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            location: obj[key].location,
            description: obj[key].description,
            schedule: {
              date: obj[key].schedule.date,
              time: obj[key].schedule.time
            },
            src: obj[key].src
          })
        }
        commit('INIT_MEETUPS', meetups)
        commit('SET_LOADING', false)
      })
      .catch(error => {
        commit('SET_LOADING', false)
        commit('SET_ERROR', error)
      })
  },
  createNewMeetup ({ commit }, payload) {
    const newMeetup = {
      title: payload.title,
      image: payload.image,
      location: payload.location,
      description: payload.description,
      schedule: {
        date: payload.schedule.date,
        time: payload.schedule.time
      }
    }
    let key = null
    let imagePath = null
    firebase.database().ref('meetups').push(newMeetup)
      .then((response) => {
        key = response.key
        return key
      })
      .then((key) => {
        const fileName = payload.image.name
        const ext = fileName.slice(fileName.lastIndexOf('.'))
        return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
      })
      .then((imageInfo) => {
        imagePath = imageInfo.metadata.downloadURLs[0]
        return firebase.database().ref('meetups').child(key).update({ imageURL: imagePath })
      })
      .then(() => {
        commit('CREATE_NEW_MEETUP', {
          ...newMeetup,
          imageURL: imagePath,
          id: key
        })
      })
      .catch(error => {
        console.log(error)
      })
  },
  createNewUser ({ commit }, payload) {
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit('SET_LOADING', false)
        commit('CREATE_NEW_USER', response)
      })
      .catch(error => {
        commit('SET_LOADING', false)
        commit('SET_ERROR', error)
      })
  },
  loginExistingUser ({ commit }, payload) {
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit('SET_LOADING', false)
        commit('CREATE_NEW_USER', response)
      })
      .catch(error => {
        commit('SET_LOADING', false)
        commit('SET_ERROR', error)
      })
  },
  autoLogiExistingUser ({ commit }, payload) {
    commit('SET_USER', { id: payload.uid, meetups: [] })
  },
  resetError ({ commit }) {
    commit('CLEAR_ERROR')
  }
}

const getters = {
  getMeetupsShort (state, getters) {
    return getters.getMeetupsSorted.slice(0, 3)
  },
  getMeetupsSorted (state) {
    return state.meetups.sort((a, b) => {
      return a.schedule.date < b.schedule.date
    })
  },
  getMeetupFeatured (state) {
    return (meetupID) => {
      return state.meetups.find(el => {
        return el.id === meetupID
      })
    }
  },
  getExistingUser (state) {
    return state.users
  },
  getError (state) {
    return state.authenticationError
  },
  getLoading (state) {
    return state.loading
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store

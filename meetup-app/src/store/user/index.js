import * as firebase from 'firebase'

const state = {
  users: []
}

const mutations = {
  'CREATE_NEW_USER' (state, payload) {
    const newUser = {
      id: payload.uid,
      meetupKEYS: {},
      meetups: []
    }
    state.users = newUser
  },
  'SET_USER' (state, payload) {
    state.users = payload
  },
  'REGISTER_USER_FOR_MEETUP' (state, payload) {
    // if (state.users.meetups.findIndex(el => el === payload.meetupID) >= 0) {
    //   return
    // }
    state.users.meetups.push(payload.meetupID)
    state.users.meetupKEYS[payload.meetupID] = payload.meetupKEY
  },
  'UNREGISTER_USER_FOR_MEETUP' (state, payload) {
    const meetups = state.users.meetups
    meetups.splice(meetups.findIndex(el => el === payload), 1)
    Reflect.deleteProperty(state.users.meetupKEYS, payload)
  }
}

const actions = {
  registerUserMeetup ({ commit, getters }, payload) {
    if (state.users.meetups.findIndex(el => el === payload.meetupID) >= 0) {
      return
    }
    commit('SET_LOADING', true)
    firebase.database().ref('/users/' + getters.getExistingUser.id).child('/registrations/').push(payload)
      .then((data) => {
        commit('SET_LOADING', false)
        commit('REGISTER_USER_FOR_MEETUP', { meetupID: payload, meetupKEY: data.key })
      })
      .catch(error => {
        console.log(error)
        commit('SET_LOADING', false)
      })
  },
  unregisterUserMeetup ({ commit, getters }, payload) {
    commit('SET_LOADING', true)
    const userCurrent = getters.getExistingUser
    if (!userCurrent.meetupKEYS) {
      return
    }
    const userCurrentMeetupKEY = userCurrent.meetupKEYS[payload]
    firebase.database().ref('/users/' + userCurrent.id + '/registrations/').child(userCurrentMeetupKEY)
      .remove()
      .then(() => {
        commit('SET_LOADING', false)
        commit('UNREGISTER_USER_FOR_MEETUP', payload)
      })
      .catch(error => {
        commit('SET_LOADING', false)
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
  autoLoginExistingUser ({ commit }, payload) {
    commit('SET_USER', {
      id: payload.uid,
      meetupKEYS: {},
      meetups: []
    })
  },
  fetchUserData ({ commit, getters }) {
    commit('SET_LOADING', true)
    firebase.database().ref('/users/' + getters.getExistingUser.id + '/registrations/')
      .once('value')
      .then(data => {
        commit('SET_LOADING', false)
        const meetupsFetched = data.val()
        const meetupsKEYs = {}
        const meetupsIDs = []
        for (let key in meetupsFetched) {
          meetupsIDs.push(meetupsFetched[key])
          meetupsKEYs[meetupsFetched[key]] = key
        }
        const userUpdated = {
          id: getters.getExistingUser.id,
          meetups: meetupsIDs,
          meetupKEYS: meetupsKEYs
        }
        commit('SET_USER', userUpdated)
      })
      .catch(error => {
        console.log(error)
        commit('SET_LOADING', false)
      })
  },
  onLogoutUser ({ commit }) {
    firebase.auth().signOut()
    commit('SET_USER', null)
  }
}

const getters = {
  getExistingUser (state) {
    return state.users
  }
}

const store = {
  state,
  mutations,
  actions,
  getters
}

export default store

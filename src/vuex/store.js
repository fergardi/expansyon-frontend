import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    fullscreen: false,
    title: '',
    search: '',
    account: {
      logged: false,
      id: 0
    },
    player: {
      Galaxy: [],
      Referendum: { metal: 0, crystal: 0, oil: 0, size: 0, energy: 0, influence: 0, attack: 0, defense: 0, speed: 0, aim: 0, evasion: 0, cargo: 0, experience: 0 }
    },
    notification: {
      text: '',
      class: ''
    }
  },
  mutations: {
    enablefullscreen (state) {
      state.fullscreen = true
    },
    disablefullscreen (state) {
      state.fullscreen = false
    },
    title (state, string) {
      state.title = string
    },
    search (state, string) {
      state.search = string
    },
    clear (state) {
      state.search = ''
    },
    login (state, id) {
      state.account.logged = true
      state.account.id = id
    },
    logout (state) {
      state.account.logged = false
      state.account.id = 0
    },
    player (state, player) {
      state.player = player
    },
    notification (state, notification) {
      state.notification = notification
    }
  }
})

export default store

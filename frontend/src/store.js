import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import environmentDefaultState from './data/mockDataEnvironment';

Vue.use(Vuex);

// TODO: move this to a constants folder
const url = 'http://localhost:3000';

const reformatByActuator = ({ state, levels, limits }) => ({
  air: {
    powerOn: state.Air,
  },
  heater: {
    powerOn: state.Heater,
    level: Number(levels.Heater.level),
    minTemp: limits.Heater['LOW-value'],
    maxTemp: limits.Heater['HIGH-value'],
  },
  lamp: {
    powerOn: state.Lamp,
    level: Number(levels.Lamp.level),
  },
});


export default new Vuex.Store({
  state: {
    count: 0,
    environment: environmentDefaultState,
  },
  mutations: {
    loadEnvironment(state, environment) {
      state.environment = environment;
    },
    toggleHeaterPower(state) {
      const { powerOn } = state.environment.heater;
      state.environment.heater.powerOn = !powerOn;
    },
  },
  actions: {
    // TODO: replace with generic callAPI function
    fetchEnvironmentState({ commit }) {
      axios.get(url)
        .then((response) => {
          const { data } = response;
          const reformattedState = reformatByActuator(data);
          commit('loadEnvironment', reformattedState);
        });
    },
  },
  getters: {
    heater: state => state.environment.heater,
  },
});

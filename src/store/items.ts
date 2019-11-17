import Vue from 'vue';
import Vuex from 'vuex';
import { load, endpoints, getUrl, defaultParams } from "../api";

interface IState {
    items: {}
}

interface IAddItem {
    type: endpoints
    params: object
    response?: object
}

export default {
    namespaced: true,
    state: {
        items: {}
    },
    getters: {
        items: (state: IState) => state.items,
    },
    mutations: {
        addItem(state: IState, { type, params, response }: IAddItem) {
            state.items = { ...state.items, [getUrl(type, params)]: response }
        }
    },
    actions: {
        async addItem({commit} : any, { type, params }: IAddItem) {
            let response = await load(endpoints[type], params);
            commit('addItem', { type, params, response })
            return response
        }
    },
}

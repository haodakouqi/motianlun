import { ActionContext } from 'vuex'
import { loginApi, getInfoApi, loginOutApi } from '@/api/user'
import { listDefaultChannel } from '@/api/channel'
import { mediaAllList } from "@/api/common";
import { rmSync } from 'fs';
import router from "@/router";
export interface userState {
  userInfo: any,
  resourcesTree: Array,
  addRouteList: Array,
  mediaOptions: Array,
  mediaObj: any,
  roleIdsOptions: any,
  allChannelOptions: any
}
const state = (): userState => ({
  userInfo: {
    loginName: ""
  },  // 用户信息
  resourcesTree: [],
  addRouteList: [],
  mediaOptions: [],
  mediaObj: {},
  roleIdsOptions: [],
  allChannelOptions: []
})

// getters
const getters = {

}

// mutations
const mutations = {
  setuUerInfo(state: userState, userInfo: object) {
    state.userInfo = userInfo
  },
  setResourcesTree(state: userState, resourcesTree: Array) {
    state.resourcesTree = resourcesTree;
  },
  setRemoveRouteList(state: userState, addRouteList: Array) {
    state.addRouteList = addRouteList;
  },
  setMedia(state: userState, data: any) {
    state.mediaOptions = data;
    state.mediaObj = data.reduce((tot, t) => {
      tot[t.id] = t.mediaName;
      return tot
    }, {})

    // console.log(`%c state`, 'color:#4278ff;', state)
  },
  setRoleIdsOptions(state: userState, data: any) {
    state.roleIdsOptions = data;
  },
  setAllchannelOptions(state: userState, data: any) {
    state.allChannelOptions = data;
  },
}

// actions
const actions = {
  /**
   * @description: 登录
   * @param {*}
   */
  async login({ commit, dispatch }: ActionContext<userState, userState>, params: any) {
    const res = await loginApi(params);
    localStorage.setItem("token", res.data);
  },
  /**
   * @description: 退出
   * @param {*}
   */
  async loginOut({ state, commit }: ActionContext<userState, userState>) {
    try {
      // console.log(`%c addRouteList`, 'color:#4278ff;', state.addRouteList)
      state.addRouteList.forEach((fn:Function) => {
        if (typeof fn === "function") {
          fn()
        }
      })
      await loginOutApi()
    } catch (error) {
      
    }
    commit('setuUerInfo', {
      loginName: ""
    })
    localStorage.removeItem('token')
    router.push('/login');
  },

  /**
   * @description: 初始化数据
   * @param {*}
   */
  async initData({ commit, dispatch }: ActionContext<userState, userState>) {
    try {
      dispatch('getMediaAllList')
      const [unfoRes, channelRes] = await Promise.all([
        getInfoApi(),
        listDefaultChannel()
      ])
      commit('setuUerInfo', unfoRes.data)
      commit('setAllchannelOptions', channelRes.data)
      // console.log(`%c channelRes`, 'color:#4278ff;', channelRes);
    } catch (error) {
      console.log(`%c initData`, 'color:#4278ff;', error);
      
    }
  },
  // 全量媒体
  async getMediaAllList({ commit }: ActionContext<userState, userState>) {
    const res = await mediaAllList()
    commit('setMedia', res.data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

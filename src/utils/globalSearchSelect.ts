import { h, defineComponent, ref, reactive, onMounted } from 'vue'
import { customerListSelect, channelListSelect, mediaListSelect, accountListSelect, userListSelect } from "@/api/common";
import { getUserByPosition } from "@/api/user";
/**
 * @description: 客户下拉
 * @param {*} import { glUseCustomerListSelect } from "@/utils/globalSearchSelect"
 */
export function glUseCustomerListSelect() {
  const glCustomerListData = reactive({
    isLoading: false,
    options: [],
  })
  const glGetCustomerList = async(val:any) => {
    try {
      glCustomerListData.isLoading = true;
      const res = await customerListSelect(val);
      glCustomerListData.options = (res.data || []).map(t => {
        return {...t, label: `${t.customerCode}-${t.customerName}`,value: t.customerCode}
      });
    } catch (error) {
      glCustomerListData.options = [];
    }
    glCustomerListData.isLoading = false;
  }

  return { glCustomerListData, glGetCustomerList }
}
/**
 * @description: 渠道下拉
 * @param {*}
 */
export function glUseChannelListSelect() {
  const glChannelListData = reactive({
    isLoading: false,
    options: [],
    platform: null
  })
  const glGetChannelList= async(val:any) => {
    try {
      glChannelListData.isLoading = true;
      const res = await channelListSelect({
        platform: glChannelListData.platform,
        channelCodeOrName: val
      });
      glChannelListData.options = (res.data || []).map(t => {
        return {...t, label: `${t.channelCode}-${t.channelName}`,value: t.channelCode}
      });
    } catch (error) {
      glChannelListData.options = [];
    }
    glChannelListData.isLoading = false;
  }

  return { glChannelListData, glGetChannelList }
}
/**
 * @description: 账号下拉
 * @param {*}
 */
export function glUseAccountListSelect() {
  const glAccountListData = reactive({
    isLoading: false,
    options: [],
    platform: null
  })
  const glGetAccountList = async(val:any) => {
    try {
      if (!glAccountListData.platform) {
        return
      }
      glAccountListData.isLoading = true;
      const res = await accountListSelect({
        platform: glAccountListData.platform,
        accountIdOrName: val
      });
      glAccountListData.options = (res.data || []).map(t => {
        return {...t, label: `${t.accountId}-${t.accountName}`,value: t.accountId}
      });;
    } catch (error) {
      glAccountListData.options = [];
    }
    glAccountListData.isLoading = false;
  }

  return { glAccountListData, glGetAccountList }
}
/**
 * @description: 媒体下拉
 * @param {*}
 */
export function glUseMediaListSelect() {
  const glMediaListData = reactive({
    isLoading: false,
    options: [],
  })
  const glGetMediaList = async(val:any) => {
    try {
      glMediaListData.isLoading = true;
      const res = await mediaListSelect(val);
      glMediaListData.options = (res.data || []).map(t => {
        return {...t, label: `${t.mediaName}`,value: t.id}
      });;
    } catch (error) {
      glMediaListData.options = [];
    }
    glMediaListData.isLoading = false;
  }

  return { glMediaListData, glGetMediaList }
}

/**
 * @description: 用户下拉
 * @param {*}
 */
export function glUserSelect() {
  const glUserData = reactive({
    isLoading: false,
    options: [],
    position: "",
    allUser: false
  })
  const glGetUserList = async(val:any) => {
    try {
      glUserData.isLoading = true;
      const res = await userListSelect({
        allUser: glUserData.allUser,
        userName: val
      });
      glUserData.options = (res.data || []).map(t => {
        return {...t, label: `${t.userName} - ${t.loginName}`,value: t.id}
      });;
    } catch (error) {
      glUserData.options = [];
    }
    glUserData.isLoading = false;
  }

  return { glUserData, glGetUserList }
}

/**
 * @description: 职位下拉
 * @param {*}
 */
export function glUsePositionSelect() {
  const glPositionData = reactive({
    isLoading: false,
    options: [],
    position: ""
  })
  const glGetPosition = async(val:any) => {
    try {
      glPositionData.isLoading = true;
      const res = await getUserByPosition({
        position: glPositionData.position
      });
      glPositionData.options = (res.data || []).map(t => {
        return {...t, label: `${t.userName} - ${t.loginName}`,value: t.id}
      });;
    } catch (error) {
      glPositionData.options = [];
    }
    glPositionData.isLoading = false;
  }

  return { glPositionData, glGetPosition }
}

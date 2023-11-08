import request from '@/utils/system/request'

// 渠道列表
export function getchannelPage(params: any) {
  return request({
    url: '/channel/list',
    method: 'get',
    params
  })
}

// 获取全量渠道
export function listDefaultChannel() {
  return request({
    url: '/channel/listDefaultChannel',
    method: 'get',
  })
}

// 添加渠道
export function addCorporationChannel(data: any) {
  return request({
    url: '/channel/addCorporationChannel',
    method: 'post',
    data
  })
}

// 编辑渠道
export function updateChannel(data: any) {
  return request({
    url: '/channel/updateChannel',
    method: 'post',
    data
  })
}


// 获取渠道返点列表
export function listChannelRebate(params: any) {
  return request({
    url: '/channelRebate/listChannelRebate',
    method: 'get',
    params
  })
}


// 保存渠道返点
export function saveChannelRebate(data: any) {
  return request({
    url: '/channelRebate/saveChannelRebate',
    method: 'post',
    data
  })
}
export function updateChannelRebate(data: any) {
  return request({
    url: '/channelRebate/updateChannelRebate',
    method: 'post',
    data
  })
}
export function deleteChannelRebate(id: any) {
  return request({
    url: `/channelRebate/deleteChannelRebate`,
    method: 'post',
    data: {id}
  })
}

/**
 * @description: 媒体授权接口
 * @param {*}
 */

// google授权回调
export function mediaAuthPage(params: any) {
  return request({
    url: '/mediaAuth/list',
    method: 'get',
    params
  })
}

// 获取媒体授权链接
export function mediaAuthOauth(platform: any) {
  const platformobj = {
    1: "meta",
    2: "google",
    3: "tiktok",
  }
  const b = platformobj[platform];
  return request({
    url: `/mediaAuth/${b}/oauth`,
    method: 'get'
  })
}

// 解绑
export function unBindUser(params: any) {
  return request({
    url: '/mediaAuth/unBindUser',
    method: 'get',
    params
  })
}

// 获取用户代理
export function listUserAgent(params: any) {
  return request({
    url: '/mediaAuth/listUserAgent',
    method: 'get',
    params
  })
}

// 新增用户代理
export function addUserAgent(data: any) {
  return request({
    url: '/mediaAuth/addUserAgent',
    method: 'post',
    data
  })
}
// 移除用户代理
export function removeUserAgent(data: any) {
  return request({
    url: '/mediaAuth/removeUserAgent',
    method: 'post',
    data
  })
}

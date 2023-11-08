import request from '@/utils/system/request'

// 媒体
export function getaccountPage(data: any) {
  return request({
    url: '/common/list',
    method: 'post',
    data
  })
}

// 下载模板
export function downloadExcelTemplate(type: any) {
  return request({
    url: '/common/downloadExcelTemplate',
    method: 'get',
    params: { type }
  })
}

// 客户下拉
export function customerListSelect(customerCodeOrName: any) {
  return request({
    url: '/common/customerList',
    method: 'get',
    params: { customerCodeOrName }
  })
}

// 渠道下拉
export function channelListSelect(params: any) {
  return request({
    url: '/common/channelList',
    method: 'get',
    params
  })
}

// 账号下拉
export function accountListSelect(params: any) {
  return request({
    url: '/common/accountList',
    method: 'get',
    params
  })
}

// 媒体下拉 模糊搜索
export function mediaListSelect(mediaName: any) {
  return request({
    url: '/common/mediaList',
    method: 'get',
    params: { mediaName }
  })
}
// 用户 模糊搜索
export function userListSelect(params: any) {
  return request({
    url: '/common/userList',
    method: 'get',
    params
  })
}

// 获取全量媒体下拉
export function mediaAllList() {
  return request({
    url: '/common/mediaAllList',
    method: 'get'
  })
}
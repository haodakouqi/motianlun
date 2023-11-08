import request from '@/utils/system/request'

// 账号列表
export function getaccountPage(params: any) {
  return request({
    url: '/mediaAccount/list',
    method: 'get',
    params
  })
}

// 导入账号
export function importAccount(data: any) {
  return request({
    url: '/mediaAccount/importAccount',
    method: 'post',
    data
  })
}

// 账号导出
export function exportMediaAccount(data: any) {
  return request({
    url: '/mediaAccount/exportMediaAccount',
    method: 'post',
    data,
    responseType: "blob"
  })
}

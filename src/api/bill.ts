import request from '@/utils/system/request'

// 客户利润报表
export function BillCustomerListPage(params: any) {
  return request({
    url: '/bill/customer/list',
    method: 'get',
    params
  })
}

// 客户利润统计值
export function BillCustomerCountPage(params: any) {
  return request({
    url: '/bill/customer/count',
    method: 'get',
    params
  })
}

// 客户利润趋势图
export function BillCustomerTrendPage(params: any) {
  return request({
    url: '/bill/customer/trend',
    method: 'get',
    params
  })
}
// 账号利润报表
export function BillAccountListPage(params: any) {
  return request({
    url: '/bill/account/list',
    method: 'get',
    params
  })
}

// 账号利润统计值
export function BillAccountCountPage(params: any) {
  return request({
    url: '/bill/account/count',
    method: 'get',
    params
  })
}

// 账号利润趋势图
export function BillAccountTrendPage(params: any) {
  return request({
    url: '/bill/account/trend',
    method: 'get',
    params
  })
}

// 渠道利润报表
export function BillChannelListPage(params: any) {
  return request({
    url: '/bill/channel/list',
    method: 'get',
    params
  })
}

// 渠道利润统计值
export function BillChannelCountPage(params: any) {
  return request({
    url: '/bill/channel/count',
    method: 'get',
    params
  })
}

// 渠道利润趋势图
export function BillChannelTrendPage(params: any) {
  return request({
    url: '/bill/channel/trend',
    method: 'get',
    params
  })
}


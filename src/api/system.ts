import request from '@/utils/system/request'


// 媒体
export function getMediaPage(params: any) {
  return request({
    url: '/media/list',
    method: 'get',
    params,
    // baseURL: "/mock/api"
  })
}

// 获取默认媒体
export function listDefaultMedia() {
  return request({
    url: '/media/listDefaultMedia',
    method: 'get',
  })
}

// 媒体
export function addCorporationMedia(data: any) {
  return request({
    url: '/media/addCorporationMedia',
    method: 'post',
    data,
  })
}

// 汇率列表
export function getExchangeRateList(params: any) {
  return request({
    url: '/exchange/getRateList',
    method: 'get',
    params
  })
}

// 添加
export function addExchangeRate(params: any) {
  return request({
    url: '/exchange/addRate',
    method: 'get',
    params
  })
}


// 查看会员充值订单
export function memberRechargeList(data: any) {
  return request({
    url: '/memberRecharge/list',
    method: 'post',
    data,
  })
}

// 提交充值订单
export function memberRechargeSubmitApply(data: any) {
  return request({
    url: '/memberRecharge/submitApply',
    method: 'post',
    data,
  })
}

// 下载发票
export function downloadRechargeFile(params: any) {
  return request({
    url: '/memberRecharge/downloadInvoiceFile',
    method: 'get',
    responseType: "blob",
    params
  })
}

// 获取会员剩余天速
export function getMemberRemainDay() {
  return request({
    url: '/memberRecharge/getMemberRemainDay',
    method: 'get',
  })
}



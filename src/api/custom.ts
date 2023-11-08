import request from '@/utils/system/request'

// 客户列表
export function getcustomerPage(data: any) {
  return request({
    url: '/customer/list',
    method: 'post',
    data
  })
}

// 导入客户
export function importCustomer(data: any) {
  return request({
    url: '/customer/importCustomer',
    method: 'post',
    data
  })
}

// 客户导出
export function exportCustomer(data: any) {
  return request({
    url: '/customer/exportCustomer',
    method: 'post',
    data,
    responseType: "blob"
  })
}

// 添加客户
export function addCustomer(data: any) {
  return request({
    url: '/customer/addCustomer',
    method: 'post',
    data
  })
}

// 编辑客户
export function editCustomer(data: any) {
  return request({
    url: '/customer/updateCustomer',
    method: 'post',
    data
  })
}

// 获取客户返点列表
export function listCustomerRebate(params: any) {
  return request({
    url: '/customerRebate/listCustomerRebate',
    method: 'get',
    params
  })
}

// 保存客户返点
export function saveCustomerRebate(data: any) {
  return request({
    url: '/customerRebate/saveCustomerRebate',
    method: 'post',
    data
  })
}
export function updateCustomerRebate(data: any) {
  return request({
    url: '/customerRebate/updateCustomerRebate',
    method: 'post',
    data
  })
}
export function deleteCustomerRebate(id: any) {
  return request({
    url: `/customerRebate/deleteCustomerRebate`,
    method: 'post',
    data: {id}
  })
}

// 获取授权用户
export function listAuthedUser(data: any) {
  return request({
    url: `/asset/listAuthedUser`,
    method: 'post',
    data
  })
}

// 保存或更新授权资产
export function upsertAuthAsset(data: any) {
  return request({
    url: `/asset/upsertAuthAsset`,
    method: 'post',
    data
  })
}



import request from '@/utils/system/request'

// 获取数据api
export function getData(data: object) {
  return request({
    url: '/work/list',
    method: 'post',
    data
  })
}

// 获取树组织数据
export function getTree(data: object) {
  return request({
    url: '/table/tree',
    method: 'post',
    data
  })
}

// 获取数据api
export function gettableData(data: object) {
  return request({
    url: '/table/list',
    method: 'post',
    data
  })
}
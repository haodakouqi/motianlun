import request from '@/utils/system/request'

// 获取概览数据
export function dashboardgetOverviewData() {
  return request({
    url: '/dashboard/getOverviewData',
    method: 'post'
  })
}


// 利润趋势
export function dashboardTrend(params:any) {
  return request({
    url: '/dashboard/corporation/trend',
    method: 'get',
    params
  })
}


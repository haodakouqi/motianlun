import request from '@/utils/system/request'

/** 登录api */
export function loginApi(data: object) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

/** 退出登录Api */
export function loginOutApi() {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}

/**
 * @description: 用户列表 注册
 * @param {*}
 */
export function registerUser(data: any) {
  return request({
    url: `/user/registerUser`,
    method: "post",
    data
  });
}

/** 获取用户信息Api */
export function getInfoApi() {
  return request({
    url: '/user/getCurrentUserInfo',
    method: 'get'
  })
}


/** 获取登录后需要展示的菜单 */
export function getMenuApi() {
  return request({
    url: '/authority/getUserMenuTree',
    method: 'get',
    // baseURL: "/mock/api"
  })
}
/** 获取全部菜单树 */
export function getMenuTree() {
  return request({
    url: '/authority/getMenuTree',
    method: 'get',
  })
}

/**
 * @description: 用户列表 查询
 * @param {*}
 */
export function getUserList(params: any) {
  return request({
    url: `/user/list`,
    method: 'get',
    params
  });
}

/**
 * @description: 用户列表 添加用户
 * @param {*}
 */
export function addUser(data: any) {
  return request({
    url: `/user/addUser`,
    method: "post",
    data
  });
}

/**
 * @description: 用户列表 更新用户信息
 * @param {*}
 */
export function updateUserInfo(data: any) {
  return request({
    url: `/user/updateUserInfo`,
    method: "post",
    data
  });
}

/** 当前用户 修改密码 */
export function passwordChange(data: object) {
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data
  })
}

/** 管理员 修改密码 */
export function adminUpdatePassword(data: object) {
  return request({
    url: '/user/adminUpdatePassword',
    method: 'post',
    data
  })
}

/** 更新用户状态 */
export function updateUserStatus(data: object) {
  return request({
    url: '/user/updateUserStatus',
    method: 'post',
    data
  })
}

/** 根据职位获取用户 */
export function getUserByPosition(params: object) {
  return request({
    url: '/user/getUserByPosition',
    method: 'get',
    params
  })
}

/** 用户离职 */
export function getDepartUser(params: object) {
  return request({
    url: '/user/leave',
    method: 'get',
    params
  })
}

/** ----------角色列表--------- */
// 角色列表 查询
export function getRoleApi(params: any) {
  return request({
    url: '/role/listRole',
    method: 'get',
    params
  })
}

// 已选 菜单
export function getRoleMenuIds(params: any) {
  return request({
    url: '/role/getRoleMenuIds',
    method: 'get',
    params
  })
}

// 添加角色
export function postAddRole(data: any) { // name
  return request({
    url: '/role/addRole',
    method: 'post',
    data
  })
}
// 更新角色名
export function updateRole(data: any) {
  return request({
    url: '/role/updateRole',
    method: 'post',
    data
  })
}

// 更新角色菜单树
export function updateRoleMenu(data: any) {
  return request({
    url: '/role/updateRoleMenu',
    method: 'post',
    data
  })
}

// 移除角色
export function removeRole(data: any) {
  return request({
    url: '/role/removeRole',
    method: 'post',
    data
  })
}

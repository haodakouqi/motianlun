import { MockMethod } from 'vite-plugin-mock'
const users = [
  { name: 'admin', password: '123456', token: 'admin', info: {
    name: '系统管理员'
  }},
  { name: 'editor', password: '123456', token: 'editor', info: {
    name: '编辑人员'
  }},
  { name: 'test', password: '123456', token: 'test', info: {
    name: '测试人员'
  }},
]
export default [
  {
    url: `/mock/api/auth/login`,
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        data: "asdfasf234243",
      };
    }
  },
  {
    url: `/mock/api/auth/logout`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {},
        msg: 'success'
      };
    }
  },
  {
    url: `/mock/api/user/getCurrentUserInfo`,
    method: 'get',
    response: () => {
      return {
        "data": {
          "avatar": "",
          "corporationName": "",
          "loginName": "管理员",
          "roleNames": [],
          "userName": "管理员11"
        },
        "errorCode": 0,
        "errorMessage": "",
        "showType": 0,
        "success": true,
        "traceId": 0
      };
    }
  },
  
  {
    url: `/mock/user/passwordChange`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {},
        msg: 'success'
      };
    }
  },
  {
    url: `/mock/api/channel/listDefaultChannel`,
    method: 'get',
    response: () => {
      return {
        "data": [],
        "errorCode": 0,
        "errorMessage": "",
        "showType": 0,
        "success": true,
        "traceId": 0
      };
    }
  },
  {
    url: `/mock/api/common/mediaAllList`,
    method: 'get',
    response: () => {
      return {
        "data": [],
        "errorCode": 0,
        "errorMessage": "",
        "showType": 0,
        "success": true,
        "traceId": 0
      };
    }
  },
] as MockMethod[]
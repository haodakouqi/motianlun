

export default [
  {
    url: `/mock/api/user/list`,
    method: 'get',
    response: () => {
      return {
        "code": 200,
        "msg": "成功",
        "requestId": null,
        "data": {
            "dataList": [
                {
                    "id": 1,
                    "loginName": "jiaxiaotong123@gmail.com",
                    "userName": "jiaxiaotong123",
                    "corporationCode": "Q000001",
                    "type": 1,
                    "createTime": "2020-11-18 14:17:08"
                }
            ],
            "total": 30
        },
        "success": true
      }
    }
  },
  {
    url: `/mock/api/user/registerUser`,
    method: 'post',
    response: () => {
      return {
        "code": 200,
        "msg": "添加成功",
        "requestId": null,
        "data": {},
        "success": true
      }
    }
  },
  {
    url: `/mock/api/role/listRole`,
    method: 'get',
    response: () => {
      return {
        "code": 200,
        "msg": "成功",
        "requestId": null,
        "data": {
            "dataList": [
                {
                    "id": 1,
                    "name": "管理员",
                    "roleCode": "ROLE_GLY",
                    "corporationCode": "Q000001",
                    "type": 1,
                    "createTime": "2020-11-18 14:17:08"
                }
            ],
            "total": 30
        },
        "success": true
      }
    }
  },
  {
    url: `/mock/api/role/addRole`,
    method: 'post',
    response: () => {
      return {
        "code": 200,
        "msg": "添加成功",
        "requestId": null,
        "data": {},
        "success": true
      }
    }
  },
  {
    url: `/mock/api/customer/list`,
    method: 'get',
    response: () => {
      return {
        "data": {
          "current": 0,
          "data": [
            {
              "abbName": "客户简称",
              "businessTypeName": "AG", // 业务类型
              "businessUser": "george.qiao",
              "code": "050300862",
              "createTime": "2023-09-12 16:51:26",
              "customerMediaAccountNum": {
                "accountNum": 0,
                "customerCode": "",
                "mediaCode": "",
                "platform": 1
              },
              "name": "北京慧德盛世文化发展有限公司",
              "operator": "george.qiao",
              "payTypeName": "预付"
            }
          ],
          "errorCode": 0,
          "errorMessage": "",
          "offset": 0,
          "pageSize": 0,
          "success": true,
          "total": 0,
          "traceId": 0
        },
        "errorCode": 0,
        "errorMessage": "",
        "showType": 0,
        "success": true,
        "traceId": 0
      }
    }
  },
  {
    url: `/mock/api/account/list`,
    method: 'post',
    response: () => {
      return {
        "code": 200,
        "msg": "成功",
        "requestId": null,
        "data": {
            "dataList": [
                {
                    "id": 1,
                    "accountId": "2778804037",
                    "name": "gytest",
                    "createTime": "2023-09-12 16:51:26",
                    "businessLine": null,
                    "customerType": "KHLB-2"
                },
                {
                    "id": 2,
                    "accountId": "8097306580",
                    "name": "gytest1202--121",
                    "createTime": "2023-09-12 16:51:26",
                    "businessLine": null,
                    "customerType": "KHLB-2"
                }
            ],
            "total": 30
        },
        "success": true
      }
    }
  },
  {
    url: `/mock/api/channel/list`,
    method: 'post',
    response: () => {
      return {
        "code": 200,
        "msg": "成功",
        "requestId": null,
        "data": {
            "dataList": [
                {
                    "id": 1,
                    "channelCode": "S2023030348",
                    "channelName": "结算中心",
                    "createTime": "2023-09-12 16:51:26",
                    "businessLine": null,
                    "customerType": "KHLB-2"
                },
                {
                    "id": 2,
                    "channelCode": "S2023031157",
                    "channelName": "INMEDIA LIMITED",
                    "createTime": "2023-09-12 16:51:26",
                    "businessLine": null,
                    "customerType": "KHLB-2"
                }
            ],
            "total": 30
        },
        "success": true
      }
    }
  },
  {
    url: `/mock/api/media/list`,
    method: 'post',
    response: () => {
      return {
        "code": 200,
        "msg": "成功",
        "requestId": null,
        "data": {
            "data": [
                {
                    "id": 1,
                    "mediaName": "Meta",
                    "createTime": "2020-11-18 14:17:08"
                },
                {
                    "id": 2,
                    "mediaName": "Google",
                    "createTime": "2020-11-18 14:17:08"
                }
            ],
            "total": 30
        },
        "success": true
      }
    }
  },
  {
    url: `/mock/exchangeRate/list`,
    method: 'post',
    response: () => {
      return {
        "code": 200,
        "msg": "成功",
        "requestId": null,
        "data": {
            "dataList": [
                {
                  "id": 1,
                  "name": "管理员",
                  "from": "ROLE_GLY",
                  "corporationCode": "Q000001",
                  "type": 1,
                  "createTime": "2020-11-18 14:17:08"
                },
                {
                  "id": 2,
                  "name": "普通成员",
                  "roleCode": "ROLE_PTCY",
                  "corporationCode": "Q000001",
                  "type": 2,
                  "createTime": "2020-11-18 14:17:38"
                }
            ],
            "total": 30
        },
        "success": true
      }
    }
  },
]

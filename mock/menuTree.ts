/*
 * @Date: 2023-03-10 19:57:44
 * @Description: 
 */
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: `/mock/api/authority/getUserMenuTree`,
    method: 'get',
    response: () => {
      return {
        "data": [
          {
              "id": 2,
              "parentId": 0,
              "code": "userManage",
              "name": "用户管理",
              "enName": "userManage",
              "path": "",
              "sort": 2,
              "type": 1,
              "resources": [
                  "userList",
                  "roleList",
                  "menuList",
                  "userManage"
              ],
              "children": [
                  {
                      "id": 9,
                      "parentId": 2,
                      "code": "userList",
                      "name": "用户列表",
                      "enName": "userList",
                      "path": null,
                      "sort": 1,
                      "type": 1,
                      "resources": [
                          "userList"
                      ],
                      "children": [],
                      "buttons": [],
                      "tabs": []
                  },
                  {
                      "id": 11,
                      "parentId": 2,
                      "code": "roleList",
                      "name": "角色列表",
                      "enName": "roleList",
                      "path": "",
                      "sort": 2,
                      "type": 1,
                      "resources": [
                          "roleList"
                      ],
                      "children": [],
                      "buttons": [],
                      "tabs": []
                  },
                  {
                      "id": 12,
                      "parentId": 2,
                      "code": "menuList",
                      "name": "菜单列表",
                      "enName": "menuList",
                      "path": "",
                      "sort": 3,
                      "type": 1,
                      "resources": [
                          "menuList"
                      ],
                      "children": [],
                      "buttons": [],
                      "tabs": []
                  }
              ],
              "buttons": [],
              "tabs": []
          },
          {
              "id": 3,
              "parentId": 0,
              "code": "customManage",
              "name": "客户管理",
              "enName": "customManage",
              "path": "",
              "sort": 3,
              "type": 1,
              "resources": [
                  "customList",
                  "accountList",
                  "customManage"
              ],
              "children": [
                  {
                      "id": 43,
                      "parentId": 3,
                      "code": "customList",
                      "name": "客户列表",
                      "enName": "customList",
                      "path": "",
                      "sort": 1,
                      "type": 1,
                      "resources": [
                          "customList"
                      ],
                      "children": [],
                      "buttons": [],
                      "tabs": []
                  },
                  {
                      "id": 44,
                      "parentId": 3,
                      "code": "accountList",
                      "name": "账号列表",
                      "enName": "accountList",
                      "path": "",
                      "sort": 2,
                      "type": 1,
                      "resources": [
                          "accountList"
                      ],
                      "children": [],
                      "buttons": [],
                      "tabs": []
                  }
              ],
              "buttons": [],
              "tabs": []
          },
          {
              "id": 6,
              "parentId": 0,
              "code": "channelManage",
              "name": "渠道管理",
              "enName": "channelManage",
              "path": null,
              "sort": 4,
              "type": 1,
              "resources": [
                "channelList",
                "mediaAuth",
                "channelManage"
              ],
              "children": [
                {
                  "id": 46,
                  "parentId": 6,
                  "code": "channelList",
                  "name": "渠道列表",
                  "enName": "channelList",
                  "path": "",
                  "sort": 1,
                  "type": 1,
                  "resources": [
                      "channelList"
                  ],
                  "children": [],
                  "buttons": [],
                  "tabs": []
                },
                {
                  "id": 56,
                  "parentId": 6,
                  "code": "mediaAuth",
                  "name": "媒体授权",
                  "enName": "mediaAuth",
                  "path": "",
                  "sort": 2,
                  "type": 1,
                  "resources": [
                      "mediaAuth"
                  ],
                  "children": [],
                  "buttons": [],
                  "tabs": []
                }
              ],
              "buttons": [],
              "tabs": []
          },
          {
              "id": 7,
              "parentId": 0,
              "code": "financeManage",
              "name": "财务管理",
              "enName": "financeManage",
              "path": "",
              "sort": 5,
              "type": 1,
              "resources": [
                  "profitReport",
                  "financeManage"
              ],
              "children": [
                  {
                      "id": 62,
                      "parentId": 7,
                      "code": "profitReport",
                      "name": "利润报表",
                      "enName": "profitReport",
                      "path": "",
                      "sort": 1,
                      "type": 1,
                      "resources": [
                          "profitReport"
                      ],
                      "children": [],
                      "buttons": [],
                      "tabs": []
                  }
              ],
              "buttons": [],
              "tabs": []
          },
          {
            "id": 8,
            "parentId": 0,
            "code": "systemManage",
            "name": "系统管理",
            "enName": "systemManage",
            "path": null,
            "sort": 6,
            "type": 1,
            "resources": [
              "mediaList",
              "exchangeRateList",
              "systemManage"
            ],
            "children": [
              {
                "id": 63,
                "parentId": 8,
                "code": "mediaList",
                "name": "媒体列表",
                "enName": "mediaList",
                "path": "",
                "sort": 1,
                "type": 1,
                "resources": [
                    "mediaList"
                ],
                "children": [],
                "buttons": [],
                "tabs": []
              },
              {
                "id": 64,
                "parentId": 8,
                "code": "exchangeRateList",
                "name": "汇率列表",
                "enName": "exchangeRateList",
                "path": "",
                "sort": 2,
                "type": 1,
                "resources": [
                    "exchangeRateList"
                ],
                "children": [],
                "buttons": [],
                "tabs": []
              }
            ],
            "buttons": [],
            "tabs": []
          },
          {
            "code": "otherManage",
            "name": "其他系统自带的",
            "enName": "otherManage",
            "resources": [],
            "children": [
              {
                "name": "工作进度",
                "code": "work",
              },
              {
                "name": "项目图标的说明",
                "code": "systemfont",
              },
              {
                "name": "文本编辑器",
                "code": "wordEditor",
              },
              {
                "name": "keepAlive使用说明",
                "code": "keepAlive",
              },
            ],
            "buttons": [],
            "tabs": []
          },
        ],
        "errorCode": 200,
        "success": true,
        "errorMessage": "success",
        "showType": 0,
        "traceId": null
      }
    }
  },
]





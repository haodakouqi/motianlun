/*
 * @Date: 2023-03-10 19:57:44
 * @Description: 
 */
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: `sss/mock/api/authority/getUserMenuTree`,
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          list: [
            {
              "routeName": "userManage",
              "redirect": "/userManage/crudTable",
              "meta": {
                "title": "用户管理",
                "icon": "sfont system-page"
              },
              "alwayShow": true,
              "resources": [
                {
                  "meta": {
                    "title": "用户列表",
                    "cache": true
                  },
                  "routeName": "userList"
                },
                {
                  "meta": {
                    "title": "角色列表",
                    "cache": true
                  },
                  "routeName": "roleList"
                },
                {
                  "meta": {
                    "title": "分类联动表格",
                    "cache": true
                  },
                  "routeName": "categoryTable"
                },
                {
                  "meta": {
                    "title": "树联动表格",
                    "cache": true
                  },
                  "routeName": "treeTable"
                },
                {
                  "meta": {
                    "title": "工作进度"
                  },
                  "routeName": "work"
                },
              ]
            },
            {
              "routeName": "customManage",
              "redirect": "/customManage/customList",
              "meta": {
                "title": "客户管理",
                "icon": "sfont system-shequ"
              },
              "alwayShow": true,
              "resources": [
                {
                  "meta": {
                    "title": "客户列表"
                  },
                  "routeName": "customList"
                },
                {
                  "routeName": "accountList",
                  "meta": {
                    "title": "账号列表"
                  }
                }
              ]
            },
            {
              "routeName": "channelManage",
              "redirect": "/channelManage/channelList",
              "meta": {
                "title": "渠道管理",
                "icon": "sfont system-shequ"
              },
              "alwayShow": true,
              "resources": [
                {
                  "meta": {
                    "title": "渠道列表"
                  },
                  "routeName": "channelList"
                }
              ]
            },
            {
              "routeName": "financialManage",
              "meta": {
                "title": "财务管理",
                "icon": "sfont system-shequ"
              },
              "alwayShow": true,
              "resources": [
                {
                  "meta": {
                    "title": "财务列表"
                  },
                  "routeName": "profitList"
                }
              ]
            },
            {
              "routeName": "systemManage",
              "redirect": "/systemManage/menu",
              "meta": {
                "title": "系统管理",
                "icon": "sfont system-xitongzhuangtai"
              },
              "alwayShow": true,
              "resources": [
                {
                  "meta": {
                    "title": "媒体列表"
                  },
                  "routeName": "mediaList"
                },
                {
                  "routeName": "exchangeRateList",
                  "meta": {
                    "title": "汇率列表"
                  },
                },
                {
                  "routeName": "user",
                  "meta": {
                    "title": "用户"
                  },
                }
              ]
            },
            {
              "routeName": "document",
              "redirect": "/document/intro",
              "meta": {
                "title": "文档",
                "icon": "sfont system-document"
              },
              "resources": [
                {
                  "routeName": "intro",
                  "meta": {
                    "title": "使用说明"
                  },
                },
                {
                  "routeName": "function",
                  "meta": {
                    "title": "功能说明"
                  },
                },
                {
                  "routeName": "menu",
                  "meta": {
                    "title": "路由菜单配置"
                  },
                },
                {
                  "routeName": "keep-alive",
                  "meta": {
                    "title": "keepAlive使用说明"
                  },
                },
                {
                  "routeName": "crud",
                  "meta": {
                    "title": "数据表格的增删改查"
                  },
                },
                {
                  "routeName": "theme",
                  "meta": {
                    "title": "自定义主题"
                  },
                },
                {
                  "routeName": "systemfont",
                  "meta": {
                    "title": "项目图标的说明"
                  },
                },
                {
                  "routeName": "api",
                  "meta": {
                    "title": "接口说明文档"
                  },
                }
              ]
            },
            {
              "routeName": "component",
              "redirect": "/component/table",
              "meta": {
                "title": "组件",
                "icon": "sfont system-component"
              },
              "alwayShow": true,
              "resources": [
                {
                  "routeName": "wordEditor",
                  "meta": {
                    "title": "文本编辑器"
                  },
                },
                {
                  "routeName": "mdEditor",
                  "meta": {
                    "title": "md编辑器"
                  },
                },
                {
                  "routeName": "codeEditor",
                  "meta": {
                    "title": "代码编辑器"
                  },
                },
                {
                  "routeName": "jsonEditor",
                  "meta": {
                    "title": "JSON编辑器"
                  },
                },
                {
                  "routeName": "dragPane",
                  "meta": {
                    "title": "可拖拽面板"
                  },
                },
                {
                  "routeName": "cutPhoto",
                  "meta": {
                    "title": "弹窗图片裁剪"
                  },
                },
                {
                  "routeName": "rightMenu",
                  "meta": {
                    "title": "右键菜单"
                  },
                },
                {
                  "routeName": "exportExcel",
                  "meta": {
                    "title": "导出文件"
                  },
                }
              ]
            },
            
            
            {
              "routeName": "directive",
              "redirect": "/directive/copy",
              "meta": {
                "title": "自定义指令",
                "icon": "sfont system-zidingyi"
              },
              "resources": [
                {
                  "routeName": "dragable",
                  "meta": {
                    "title": "拖拽指令：v-dragable"
                  },
                },
                {
                  "routeName": "copy",
                  "meta": {
                    "title": "复制指令：v-copy"
                  },
                },
                {
                  "routeName": "waterMarker",
                  "meta": {
                    "title": "水印指令：v-waterMarker"
                  },
                },
                {
                  "routeName": "longpress",
                  "meta": {
                    "title": "长按指令：v-longpress"
                  },
                },
                {
                  "routeName": "debounce",
                  "meta": {
                    "title": "按钮防抖指令：v-debounce"
                  },
                },
                {
                  "routeName": "scroll",
                  "meta": {
                    "title": "下拉加载指令：v-infinite-scroll"
                  },
                },
                {
                  "routeName": "clickOutside",
                  "meta": {
                    "title": "点击外部区域：v-click-outside"
                  },
                }
              ]
            },
            {
              "routeName": "echarts",
              "redirect": "/echarts/dragable",
              "meta": {
                "title": "echarts图表",
                "icon": "sfont system-chart"
              },
              "resources": [
                {
                  "routeName": "bar",
                  "meta": {
                    "title": "柱状图"
                  },
                },
                {
                  "routeName": "line",
                  "meta": {
                    "title": "折线图"
                  },
                },
                {
                  "routeName": "pie",
                  "meta": {
                    "title": "饼图"
                  },
                },
                {
                  "routeName": "radar",
                  "meta": {
                    "title": "雷达图"
                  },
                },
                {
                  "routeName": "map",
                  "meta": {
                    "title": "地图"
                  },
                }
              ]
            },
            
            {
              "routeName": "MultiLevelmenu",
              "redirect": "/menu/menu-1",
              "alwayShow": true,
              "meta": {
                "title": "多级嵌套菜单",
                "icon": "sfont system-menu"
              },
              "resources": [
                {
                  "routeName": "menu-1",
                  "redirect": "/menu/menu-1/menu-1-1",
                  "meta": {
                    "title": "二级菜单1"
                  },
                  "resources": [
                    {
                      "routeName": "menu-1-1",
                      "redirect": "/menu/menu-1/menu-1-1/menu-1-1-1",
                      "meta": {
                        "title": "三级菜单1-1"
                      },
                      "resources": [
                        {
                          "routeName": "menu-1-1-1",
                          "meta": {
                            "title": "四级菜单1-1-1"
                          },
                        },
                        {
                          "routeName": "menu-1-1-2",
                          "meta": {
                            "title": "四级菜单1-1-2"
                          },
                        }
                      ]
                    },
                    {
                      "routeName": "menu-1-2",
                      "meta": {
                        "title": "三级菜单1-2"
                      },
                    }
                  ]
                },
                {
                  "routeName": "menu-2",
                  "meta": {
                    "title": "二级菜单2"
                  }
                },
                {
                  "routeName": "menu-3",
                  "meta": {
                    "title": "二级菜单3"
                  }
                }
              ]
            },
          ]
        },
        msg: ''
      };
    }
  },
]


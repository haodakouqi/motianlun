/*
 * @Date: 2022-05-22 20:44:25
 * @Description: 
 */
export const systemTitle = 'CustifyMedia' // 系统名称，用于显示在左上角模块，登录模块、以及浏览器标题上使用,使用配置项


export const priceList = [
  {
    title: "免费版",
    servicePeriod: 0,
    des: "满足基础使用场景并免费半个月",
    btn: "免费试用",
    price: "0",
    curency: "￥",
    period: "",
    subitem: [
      { content: "试用半个月" },
      { content: "不支持定制化开发需求" },
    ]
  },
  {
    title: "月会员",
    servicePeriod: 1,
    des: "超高折扣，性价比首选",
    btn: "升级会员",
    price: "2999",
    curency: "￥",
    period: "月",
    subitem: [
      { content: "支持提3个定制化的需求开发" },
      { content: "享受月会员服务，全程陪同" },
    ]
  },
  {
    title: "季会员",
    servicePeriod: 2,
    des: "超高折扣，性价比首选",
    btn: "升级会员",
    price: "7999",
    curency: "￥",
    period: "季",
    subitem: [
      { content: "支持提10个定制化的需求开发" },
      { content: "享受季会员服务，全程陪同" },
    ]
  },
  {
    isPopular: true,
    title: "年会员",
    servicePeriod: 3,
    des: "价格最低，最具竞争力",
    btn: "升级会员",
    price: "23999",
    curency: "￥",
    period: "年",
    subitem: [
      { content: "不限制定制化需求开发" },
      { content: "享受年会员服务，全程陪同" }
    ]
  }
];
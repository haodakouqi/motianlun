/**
 * 枚举 
 * import {} from "@/utils/enum";
 */
import { $isEmpty } from "./methods";

/**
 * 对象转为数组下拉框
 * @param {Object | Array} target
 * @returns {Object | Array}
 */
export const $setObjectToArray = function(val: any, type = "string") {
  if ($isEmpty(val)) {
    return []
  }
  return Object.keys(val).map(t => {
    const result = {
      label: val[t],
      value: t,
    }
    if (type === "number") {
      result.value = Number(result.value);
    }
    if (Object.prototype.toString.call(val[t]) === '[object Object]') {
      Object.assign(result, val[t])
    } else {
      result.label = val[t];
    }
    return result;
  })
}

// 菜单类型
export const MENU_ENUM = {
  1: {
    label: "目录",
    tagType: "warning",
  },
  2: {
    label: "菜单",
    tagType: "success",
  },
  3: {
    label: "Tab",
    tagType: "danger",
  },
  4: {
    label: "按钮",
    tagType: "danger",
  },
};


// 用户状态
export const user_STATUS_ENUM = {
  0: {
    label: "停用",
    textType: "danger",
    acitveBtntext: "激活",
    acitveBtnColor: "success",
  },
  1: {
    label: "正常",
    textType: "success",
    acitveBtntext: "停用",
    acitveBtnColor: "danger",
  }
};
export const user_STATUS_ENUM_OPTIONS = $setObjectToArray(user_STATUS_ENUM);

// 业务类型
export const businessType_ENUM = {
  1: {
    label: "开户",
    color: "--global-color-success",
    tagType: "success",
  },
  2: {
    label: "代投",
    color: "--global-color-warning",
    tagType: "warning",
  },
};
export const businessType_ENUM_OPTIONS = $setObjectToArray(businessType_ENUM, "number");


// 付款类型
export const payType_ENUM = {
  1: {
    label: "预付",
    color: "--global-color-success",
    tagType: "success",
  },
  2: {
    label: "后付",
    color: "--global-color-warning",
    tagType: "warning",
  },
};
export const payType_ENUM_OPTIONS = $setObjectToArray(payType_ENUM, "number");


// 币种
export const CURRENCY_ENUM_OPTIONS = [
  'USD',
  'HKD',
  'CNY',
];


// 媒体名称
export const agentId_ENUM = {
  1: "BM",
  2: "MCC",
  3: "BC"
};

// 媒体 下载模板
export const media_DOWNLOAD_ENUM = {
  1: "META_ACCOUNT",
  2: "GOOGLE_ACCOUNT",
  3: "TIKTOK_ACCOUNT",
  other: "OTHER_ACCOUNT"
};

// 职位枚举
export const position_ENUM = {
  1: {
    label: "主管",
    tagType: "success",
  },
  2: {
    label: "商务",
    tagType: "warning",
  },
  3: {
    label: "运营",
    tagType: "warning",
  },
  4: {
    label: "财务",
    tagType: "warning",
  },
};

export const position_ENUM_OPTIONS = $setObjectToArray(position_ENUM, "number");

// 用户状态
export const account_STATUS_ENUM = {
  1: {
    label: "正常",
    textType: "success"
  }
};


// 会员状态
export const member_STATU_ENUM = {
  1: {
    label: "待审核",
    tagType: "warning",
  },
  2: {
    label: "审核通过",
    tagType: "success",
  },
  3: {
    label: "审核失败",
    tagType: "danger",
  },
};

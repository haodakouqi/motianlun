/*
 * @Author: 正则
 */

// 邮箱
export const emailReg = {
  pattern: /^[A-Za-z0-9\u4e00-\u9fa5\.\-\_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  message: "请输入正确格式的邮箱"
}
// 密码
export const pswReg = {
  pattern: /^(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+._~!@#$%^&*()]{8,20}$/,
  message: "密码必须同时含有数字和字母，且长度在8-20位!"
}

// 手机号
export const phoneReg = {
  pattern: /^1[3456789]\d{9}$/,
  message: "请输入正确的手机号"
}

/*
 * @LastEditors: import { $isEmpty } from "@/utils/methods";
 * @Description: 全局公共方法文件
 */
import * as XLSX from 'xlsx';
import dayjs from "dayjs";

export function getToken() {
  return localStorage.getItem("token")
}

/**
 * 是否为空
 * @param {Object | Array} target
 * @returns {Object | Array}
 */
export const $isEmpty = function(val: any) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
  // String or Array
  case '[object String]':
  case '[object Array]':
    return !val.length;

    // Map or Set or File
  case '[object File]':
  case '[object Map]':
  case '[object Set]': {
    return !val.size;
  }
  // Plain Object
  case '[object Object]': {
    return !Object.keys(val).length;
  }
  default: return false
  }
}

/**
 * 深拷贝
 * @param {Object | Array} target
 * @returns {Object | Array}
 */
export const $deepcopy = function(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 创建A标签下载
 * @param {Object | Array} target
 * @returns {Object | Array}
 */
export const $CreatDownload = function(param: any) {
  const { file, FileName, href } = param
  let url = null
  if (file) { // 文件流下载
    url = window.URL.createObjectURL(
      new Blob([file], { type: "octet/stream" })
    )
  }
  if (href) { // 地址下载
    url = href
  }
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = url;
  a.download = FileName;
  a.click();
  setTimeout(() => {
    a.remove();
  }, 0);
};

/**
 * 设置月份
 * @param {Object | Array} target
 * @returns {Object | Array}
 */
export function $setMonth(s = 13, d = 0) {
  const start = dayjs().subtract(s, 'days').format("YYYY-MM-DD")
  const end = dayjs().subtract(d, 'days').format("YYYY-MM-DD")
  return [ start, end ]
}

/**
 * JSON转XLSX表格导出
 * @param {Object | Array} target
 * @returns {Object | Array}
 */
export const $ExportXLSX = function({
  data = [], FileName = "下载文件", SheetName = "SheetJS"
}) {
  console.log(`%c qjlog`, 'color:#4278ff;', data, FileName)
  // 定义excel文档的名称
  var ws_name = SheetName
  // 初始化一个excel文件
  var wb = XLSX.utils.book_new();
  // 初始化一个excel文档，此时需要传入数据
  var ws = XLSX.utils.aoa_to_sheet(data);
  // 将文档插入文件并定义名称
  XLSX.utils.book_append_sheet(wb, ws, ws_name);
  // 执行下载
  XLSX.writeFile(wb, `${FileName}.xlsx`);
};

/**
 * 全局合并单元格 统一方法
 * @param {Object | Array} target
 * @returns {Object | Array}
 */
export const $glSpanMethod = ({ row, column }) => {
  if (!$isEmpty(row.$spanMethod) && row.$spanMethod.$field.includes(column.property)
  ) {
    const { rowspan, colspan } = row.$spanMethod;
    return { rowspan, colspan };
  }
}

export default {
  $isEmpty,
  $deepcopy,
  $CreatDownload,
  $glSpanMethod
}

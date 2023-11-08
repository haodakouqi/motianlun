export const color = [
  "#2ec7c9",
  "#b6a2de",
  "#5ab1ef",
  "#ffb980",
  "#d87a80",
  "#8d98b3",
  "#e5cf0d",
  "#97b552",
  "#95706d",
  "#dc69aa",
  "#07a2a4",
  "#9a7fd1",
  "#588dd5",
  "#f5994e",
  "#c05050",
  "#59678c",
  "#c9ab00",
  "#7eb00a",
  "#6f5553",
  "#c14089",
];

export function lineNormal(data, config = {}) {
  try {
    const { yAxisName = '金额($)' } = config
    const { col, selected, value } = data
    const legendData = []
    const seriesData = value.map(item => {
      item.type = "line";
      item.smooth = true;
      legendData.push(item.name);
      return item
    })
    const option = {
      title: {
        text: "",
      },
      color: color,
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255,255,255,1)", // 通过设置rgba调节背景颜色与透明度
        color: "#303133",
        borderColor: "#ccc",
        borderWidth: 1,
        textStyle: {
          color: "#303133",
        },
      },
      legend: {
        data: legendData,
        bottom: "0",
        selected: selected || {}
      },
      grid: {
        top: "7%",
        left: "4%",
        right: "4%",
        bottom: "7%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: col,
        axisLabel: {
          rotate: "45",
          textStyle: {
            color: "#000",
            fontSize: 12,
            fontStyle: "italic",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#DCDFE6",
          },
        },
      },
      yAxis: {
        type: "value",
        name: yAxisName,
        nameTextStyle: {
          color: "#000",
        },
        splitLine: {
          show: true,
          lineStyle: { type: "dotted" },
        },
        axisLabel: {
          textStyle: {
            color: "#000",
            fontSize: 12,
            fontStyle: "italic",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#DCDFE6",
          },
        },
      },
      series: seriesData,
    };
    return option
  } catch (error) {
    return {}
  }
}

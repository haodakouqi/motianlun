<template>
  <div class="dashboard">
    <div class="mb-20">
      <ListTitleInfo title="资产概述" />
      <GlStatistic
        ref="GlStatistic"
        :data="statisticData.data"
        v-loading="statisticData.isLoading"
      />
    </div>
    <div>
      <ListTitleInfo title="趋势概览">
        <el-tooltip
          effect="dark"
          content="近15天趋势"
          placement="top"
        >
          <el-icon style="margin-left: 4px" :size="16">
            <QuestionFilled />
          </el-icon>
        </el-tooltip>
      </ListTitleInfo>
      <div class="chart-box" v-loading="chartData.isLoading">
        <Chart v-if="!chartData.isEmpty" :option="chartData.data" />
        <el-empty v-else description="无数据" />
      </div>
    </div>

    
  </div>
</template>

<script lang="jxs">
import { defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { dashboardgetOverviewData, dashboardTrend } from "@/api/index";

import ListTitleInfo from '@/components/ListTitleInfo/index.vue'
import Chart from '@/components/charts/index.vue'
import GlStatistic from './statistic.vue'
import { lineNormal } from '@/components/charts/config'
import Card from './card/index.vue'

import { $setMonth } from "@/utils/methods";

export default defineComponent({
  components: {
    ListTitleInfo, GlStatistic, Chart,
    Card
  },
  setup(props, ctx) {
    // 统计
    const statisticData = reactive({
      data: [],
      isLoading: false,
    })

    const getTotalCount = async () => {
      try {
        statisticData.isLoading = true;
        const res = await dashboardgetOverviewData();
        const {
          cashBalanceCustomerNum,
          creditsCustomerNum,
          accountNumList,
          channelNumList,
          mediaUserNumList,
        } = (res.data || {})

        statisticData.data = [
          {
            label: '客户数',
            path: '/customManage/customList',
            data: [
              { name: '预付', value: cashBalanceCustomerNum },
              { name: '后付', value: creditsCustomerNum },
            ]
          },
          {
            label: '账号数',
            path: '/customManage/accountList',
            data: (accountNumList|| []).map(t => ({name: t.mediaName, value: t.num}))
          },
          {
            label: '渠道数',
            path: '/channelManage/channelList',
            data: (channelNumList|| []).map(t => ({name: t.mediaName, value: t.num}))
          },
          {
            label: '媒体用户',
            path: '/channelManage/mediaAuth',
            data: (mediaUserNumList|| []).map(t => ({name: t.mediaName, value: t.num}))
          },
        ];
      } catch (error) {
        console.log(`%c qjlog`, 'color:#4278ff;', error)
        statisticData.data = [
          {
            label: '客户数',
            data: [
              { name: '预付', value: 0 },
              { name: '后付', value: 0 },
            ]
          },
          {
            label: '账号数',
            data: []
          },
          {
            label: '渠道数',
            data: []
          },
          {
            label: '媒体用户',
            data: []
          },
        ];
      }
      statisticData.isLoading = false;
    }

    // 图表
    const chartData = reactive({
      data: {},
      isLoading: false,
      isEmpty: false,
    })
    const getChartData = async () => {
      try {
        chartData.isEmpty = false;
        chartData.isLoading = true;
        const [startTime, endTime] = $setMonth()
        const res = await dashboardTrend({
          startTime, endTime
        });
        const a = (res.data || {})
        if (!a.col || !a.col.length) {
          throw new Error("表格数据为空");
        }
        chartData.data = lineNormal(a);
      } catch (error) {
        console.log(`%c qjlog`, 'color:#4278ff;', error)
        chartData.isEmpty = true;
        chartData.data = {};
      }
      chartData.isLoading = false;
    }

    onMounted(() => {
      getTotalCount()
      getChartData()
    })
    return {
      statisticData, getTotalCount,

      chartData, getChartData
    }
  }
})
</script>

<style lang="scss">
.dashboard {
  .chart-box {
    margin: 10px auto 0;
    width: calc(100% - 40px);
    height: 400px;
    background: var(--system-page-background);
    padding: 20px;
    overflow: hidden;
  }
}
</style>
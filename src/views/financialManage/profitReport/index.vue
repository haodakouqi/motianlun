<template>
  <div class="profitReport">
    <div class="global-search">
      <el-form :model="searchForm">
        <div class="global-form">
          <el-form-item label>
            <el-date-picker
              v-model="searchForm.timeFrame"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束之间"
              value-format="YYYY-MM-DD"
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label>
            <el-select
              v-model="searchForm.customerCode"
              placeholder="客户编码/名称"
              clearable
              filterable
              remote
              :remote-method="glGetCustomerList"
              :loading="glCustomerListData.isLoading"
              @focus="glGetCustomerList('')"
            >
              <el-option
                v-for="item in glCustomerListData.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label>
            <el-select
              v-model="searchForm.platform"
              placeholder="媒体/名称"
              clearable
              filterable
              remote
              :remote-method="glGetMediaList"
              :loading="glMediaListData.isLoading"
              @focus="glGetMediaList('')"
            >
              <el-option
                v-for="item in glMediaListData.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label>
            <el-select
              v-model="searchForm.channelCode"
              placeholder="渠道编码/名称"
              clearable
              filterable
              remote
              :remote-method="glGetChannelList"
              :loading="glChannelListData.isLoading"
              @focus="glGetChannelList('')"
            >
              <el-option
                v-for="item in glChannelListData.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-button
            :loading="listData.isLoading"
            type="primary"
            @click="handleSearch()"
          >
            查询
          </el-button>
        </div>
      </el-form>
    </div>
    <div>
      <ListTitleInfo title="当前统计" />
      <GlStatistic
        ref="GlStatistic"
        :data="statisticData.data"
        v-loading="statisticData.isLoading"
      />
    </div>
    <div>
      <ListTitleInfo title="趋势分析" />
      <div class="chart-box" v-loading="chartData.isLoading">
        <Chart v-if="!chartData.isEmpty" :option="chartData.data" />
        <el-empty v-else description="无数据" />
      </div>
    </div>

    <div class="global-module">
      <ListTitleInfo title="数据报表">
        <!-- <div class="global-model">
          <div class="global-model-right">
            <glExportBtn 
              :exportData="{
                exportFn: '',
                params: '',
                FileName: ''
              }"
            />
          </div>
        </div> -->
      </ListTitleInfo>
      <div
        v-loading="listData.isLoading"
      >
        <el-table
          :data="listData.info"
        >
          <el-table-column
            v-for="col in tableCol"
            :key="col.prop"
            :prop="col.prop"
            :formatter="col.formatter"
            :label="col.label"
            :width="col.width"
          />
        </el-table>
        <el-pagination
          class="mt-20"
          :total="listData.total"
          :page-sizes="[10, 20, 30, 40]"
          v-model:current-page="listData.current"
          v-model:page-size="listData.pageSize"
          layout="total,sizes, prev, pager, next, jumper"
          @size-change="() => {
            listData.current = 1
            getList()
          }"
          @current-change="getList"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { h, defineComponent, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'

import { BillCustomerListPage, BillCustomerCountPage, BillCustomerTrendPage } from "@/api/bill";
import ListTitleInfo from '@/components/ListTitleInfo/index.vue'
import Chart from '@/components/charts/index.vue'
import GlStatistic from '@/components/gl-statistic/index.vue'
import { lineNormal } from '@/components/charts/config'
import { 
  glUseCustomerListSelect,
  glUseChannelListSelect,
  glUseMediaListSelect
} from "@/utils/globalSearchSelect"
import { $setMonth } from "@/utils/methods";

const statisticList = [
  {
    label: "利润($)",
    key: "profit",
    value: 0
  },
  {
    label: "花费($)",
    key: "spend",
    value: 0
  },
  {
    label: "服务费($)",
    key: "serviceCharge",
    value: 0
  },
  {
    label: "返点收入($)",
    key: "rebateIncome",
    value: 0
  },
  {
    label: "返点支出($)",
    key: "rebateCost",
    value: 0
  },
  
]
/**
 * @description: 表格函数
 * @param {*}
 */
function usetable() {
    const searchForm = reactive({
      timeFrame: $setMonth(),
      platform: null,
      customerCode: null,
      channelCode: null
    })
    const listData = reactive({
      isLoading: false,
      searchParams: {},
      info: [],
      pageSize: 10,
      current: 1,
      total: 0
    })
    const getList = async() => {
      try {
        const params = {
          pageSize: listData.pageSize,
          current: listData.current,
          ...listData.searchParams
        };
        listData.isLoading = true;
        const res = await BillCustomerListPage(params);
        listData.info = (res.data.data || []);
        listData.total = res.data.total;
      } catch (error) {
        listData.info = [];
        listData.total = 0;
      }
      listData.isLoading = false;
    }
    return { searchForm, listData, getList }
}


export default defineComponent({
  components: { ListTitleInfo, GlStatistic, Chart },
  setup(props, ctx) {
    const store = useStore()
    const mediaOptions = store.state.user.mediaOptions;

    const { searchForm, listData, getList } = usetable();
    const { glCustomerListData, glGetCustomerList } = glUseCustomerListSelect();
    const { glChannelListData, glGetChannelList } = glUseChannelListSelect();
    const { glMediaListData, glGetMediaList } = glUseMediaListSelect();

    const handleSearch = () => {
      const {timeFrame, ...last } = searchForm
      listData.searchParams= {
        ...last,
        startTime: timeFrame[0],
        endTime: timeFrame[1],
       }
      listData.current = 1
      getList();
      getTotalCount()
      getChartData()
    }

    // 统计
    const statisticData = reactive({
      data: [],
      isLoading: false,
    })

    const getTotalCount = async () => {
      try {
        const params = {
          ...listData.searchParams
        };
        statisticData.isLoading = true;
        const res = await BillCustomerCountPage(params);
        const a = (res.data || [])
        statisticData.data = statisticList.map(t => {
          return {...t, value: a[t.key] }
        });
      } catch (error) {
        console.log(`%c qjlog`, 'color:#4278ff;', error)
        statisticData.data = [];
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
        const params = {
          ...listData.searchParams
        };
        chartData.isEmpty = false;
        chartData.isLoading = true;
        const res = await BillCustomerTrendPage(params);
        const a= (res.data || {})
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
      handleSearch()
    })

    return {
      glCustomerListData, glGetCustomerList,
      glChannelListData, glGetChannelList,
      glMediaListData, glGetMediaList,
      statisticData,
      chartData,
      mediaOptions,
      handleSearch,
      searchForm, listData, getList
    }
  },
  computed: {
    permissionButtons() {
      return this.$route.meta.permissionButtons || [];
    },
    tableCol() {
      const _this = this;
      return [
        {
          label: "客户编码",
          prop: "customerCode",
          width: 200
        },
        {
          label: "客户名称",
          prop: "customerName"
        },
        {
          label: "利润($)",
          prop: "profit"
        },
        {
          label: "花费($)",
          prop: "spend",
          width: 160,
          // formatter: (row:any) => {
          //   const {channelCode, channelName} = row;
          //   return [channelCode, channelName].join('、')
          // }
        },
        {
          label: "服务费($)",
          prop: "serviceCharge"
        },
        {
          label: "返点收入($)",
          prop: "rebateIncome"
        },
        {
          label: "返点支出($)",
          prop: "rebateCost"
        }
      ];
    }
  }
});
</script>
<style lang="scss">
.profitReport {
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

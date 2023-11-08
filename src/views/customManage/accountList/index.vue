<template>
  <div class="layout-container">
    
    <el-tabs v-model="platform" @tab-change="tabChange">
      <el-tab-pane
        v-for="t in mediaOptions"
        :label="t.mediaName"
        :key="t.id"
        :name="t.id"
      >
        <template #label>
          <span class="global-flex" style="gap: 5px">
            <SvgIcon v-if="[1, 2, 3].includes(t.id)" :iconClass="t.mediaName" size="16"></SvgIcon>
            <span>{{t.mediaName}}</span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div v-if="mediaOptions.length">
      <div class="global-search">
        <el-form :model="searchForm">
          <div class="global-form">
            <el-form-item>
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
            <el-form-item>
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
            <el-form-item>
              <el-select
                v-model="searchForm.accountId"
                placeholder="账号ID/名称"
                clearable
                filterable
                remote
                :remote-method="glGetAccountList"
                :loading="glAccountListData.isLoading"
                @focus="glGetAccountList('')"
              >
                <el-option
                  v-for="item in glAccountListData.options"
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
      <div class="global-model mb-20">
        <el-button
          type="primary"
          @click="openImportXlsx()"
        >
          导入账号
        </el-button>
        <div class="global-model-right">
          <glExportBtn 
            :exportData="exportData"
          />
        </div>
      </div>
      <div
        v-loading="listData.isLoading"
        class="global-module"
      >
        <el-table
          :data="listData.info"
        >
          <gltableColumn 
            :data="tableCol"
          />
        </el-table>
        <el-pagination
          class="mt-20"
          :total="listData.total"
          :page-sizes="[10, 20, 30, 40]"
          v-model:current-page="listData.current"
          v-model:page-size="listData.pageSize"
          layout="total,sizes, prev, pager, next, jumper"
          @size-change="handleSearch()"
          @current-change="getList"
        />
      </div>
    </div>

    <importAccountDialog 
      ref="importAccountDialog"
      :platform="platform"
      @submit="getList"
    />
  </div>
</template>

<script lang="tsx">
import { h, defineComponent, ref, reactive, onMounted, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getaccountPage,exportMediaAccount } from "@/api/account";
import importAccountDialog from "./importAccountDialog.vue";

import { 
  glUseCustomerListSelect,
  glUseChannelListSelect,
  glUseAccountListSelect
} from "@/utils/globalSearchSelect"
import {
  agentId_ENUM,
  account_STATUS_ENUM
} from "@/utils/enum";
/**
 * @description: 表格函数
 * @param {*}
 */
function usetable() {
    const platform = ref(1)
    const searchForm = reactive({
      customerCodeOrName: null,
      channelCodeOrName: null,
      accountIdOrName: null,
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
          platform: platform.value,
          ...listData.searchParams
        };
        listData.isLoading = true;
        const res = await getaccountPage(params);
        listData.info = (res.data.data || []);
        listData.total = res.data.total;
      } catch (error) {
        listData.info = [];
        listData.total = 0;
      }
      listData.isLoading = false;
    }

    return { platform, searchForm, listData, getList }
}


export default defineComponent({
  components: {
    importAccountDialog
  },
  setup(props, ctx) {
    const store = useStore()
    const mediaOptions = store.state.user.mediaOptions;
    const mediaObj = store.state.user.mediaObj;

    const { platform, searchForm, listData, getList } = usetable();

    const exportData = computed(() => {
      return {
        exportFn: exportMediaAccount,
        params: {
          platform: platform.value,
          ...listData.searchParams
        },
        FileName: `${mediaObj[platform.value]}账号.xlsx`
      }
    })
    
    const { glCustomerListData, glGetCustomerList } = glUseCustomerListSelect();
    const { glChannelListData, glGetChannelList } = glUseChannelListSelect();
    const { glAccountListData, glGetAccountList } = glUseAccountListSelect();


    watch(() => platform, (newVal: any) => {
      glChannelListData.platform = newVal;
      glAccountListData.platform = newVal;
    },{ immediate: true })
    
    const handleSearch = () => {
      listData.searchParams= {...searchForm }
      listData.current = 1
      getList();
    }
    const tabChange = (a = 1) => {
      console.log(`%c platform`, 'color:#4278ff;', typeof a)
      platform.value = a;
      handleSearch();
    }
    onMounted(() => {
      if (!mediaOptions.length) {
        ElMessage({
          type: "error",
          message: "请先在媒体列表添加媒体"
        });
        return
      }
      platform.value = mediaOptions[0].id;
      handleSearch()
    })
    
    const importAccountDialog = ref(null);
    const openImportXlsx = () => {
      importAccountDialog.value.visible = true;
    }

    return {
      glCustomerListData, glGetCustomerList,
      glChannelListData, glGetChannelList,
      glAccountListData, glGetAccountList,
      platform,
      mediaOptions,
      handleSearch,
      tabChange,
      searchForm, listData, getList, exportData,

      importAccountDialog,
      openImportXlsx
    }
  },
  computed: {
    permissionButtons() {
      return this.$route.meta.permissionButtons || [];
    },
    tableCol() {
      const _this = this;
      const result = [
        {
          label: "账号ID",
          prop: "accountId",
          width: 200
        },
        {
          label: "账号名称",
          prop: "name"
        },
        {
          label: "账号余额",
          prop: "balance"
        },
        {
          label: "币种",
          prop: "currency"
        },
        {
          label: "状态",
          prop: "status",
          scopedSlots: {
            default: (scope: any) => {
              const { label, textType } = (account_STATUS_ENUM[scope.row.status] || {});
              if (!label) {
                return "--"
              }
              return (
                <el-tag class="ml-2" type={textType}>{label}</el-tag>
              )
            }
          }
        },
        {
          visible: [1, 2, 3].includes(_this.platform),
          label: agentId_ENUM[_this.platform],
          prop: "agentId"
        },
        {
          label: "渠道编码/名称",
          prop: "channelCode",
          width: 200,
          formatter: (row:any) => {
            const {channelCode, channelName} = row;
            return [channelCode, channelName].join('-')
          }
        },
        {
          label: "客户编码/名称",
          prop: "customerCode",
          width: 200,
          formatter: (row:any) => {
            const {customerCode, customerName} = row;
            return [customerCode, customerName].join('-')
          }
        }
      ];

      return result.filter(t => {
        /* eslint-disable */
        return t.hasOwnProperty('visible') ? t.visible : true
      })
    }
  }
});
</script>
<style lang="scss">

</style>

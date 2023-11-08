<template>
  <div class="memberList">
    <div class="header mb-20">
      <div class="header-box">
        <div class="header-wrapper">
          <div class="title">会员到期剩余</div>
          <div class="value">
            {{expirationTime}}
            <span>天</span>
          </div>
        </div>

        <el-button
          type="primary"
          size="large"
          @click="openUserModal('ADD')"
        >
          充值
        </el-button>
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
    </div>

    <!-- 添加/编辑用户 -->
    <MemberRecharge
      ref="MemberRecharge"
      :dialog-data="dialogData"
      @submit="getList(listData.current)"
    />

  </div>
</template>

<script lang="tsx">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'

import { getMemberRemainDay, memberRechargeList, downloadRechargeFile } from "@/api/system";
import MemberRecharge from "./MemberRecharge.vue";;

import { 
  glUseMediaListSelect
} from "@/utils/globalSearchSelect"

import { member_STATU_ENUM } from "@/utils/enum";
import { priceList } from '@/config'
/**
 * @description: 表格函数
 * @param {*}
 */
function usetable() {
    const searchForm = reactive({
      platform: '',
      name: ''
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
        const res = await memberRechargeList(params);
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
/**
 * @description: 操作权限
 * @param {*}
 */
function useoperate() {
  const MemberRecharge = ref(null)
  const dialogData = ref({})

  const openUserModal = ($type = "ADD", data = {}) => {
    dialogData.value = {
      $type,
      ...data
    }
    MemberRecharge.value.visible = true;
  }


  return { 
    dialogData, MemberRecharge, openUserModal
  }
}

export default defineComponent({
  components: {
    MemberRecharge
  },
  setup(props, ctx) {
    const store = useStore()
    const mediaOptions = store.state.user.mediaOptions;

    const expirationTime = ref()
    /**
     * @description: 下拉查询
     * @param {*}
     */
    async function getAccountStatusOptions() {
      try {
        const res = await getMemberRemainDay({});
        expirationTime.value = res.data;
      } catch (error) {
        expirationTime.value = 0;
      }
    }

    const statusOptions = reactive([])
    const { searchForm, listData, getList } = usetable();
    const handleSearch = () => {
      listData.searchParams= {...searchForm}
      listData.current = 1
      getList();
    }

    const { glMediaListData, glGetMediaList } = glUseMediaListSelect();

    const {
    dialogData, MemberRecharge, openUserModal
    } = useoperate();
    
    onMounted(() => {
      getAccountStatusOptions()
      handleSearch()
    })
    return {
      expirationTime,
      mediaOptions,
      statusOptions,
      handleSearch,
      searchForm, listData, getList,
      glMediaListData, glGetMediaList,

      dialogData, MemberRecharge, openUserModal
    }
  },
  computed: {
    tableCol() {
      const _this = this;
      return [
        {
          label: "订单号",
          prop: "applyCode"
        },
        {
          label: "支付金额",
          prop: "amount",
          formatter: (row: any) => {
            return `￥${row.amount}`;
          }
        },
        {
          label: "支付类型",
          prop: "servicePeriod",
          formatter: (row: any) => {
            const obj = priceList.find(t => t.servicePeriod === row.servicePeriod)
            return obj?.title || '--';
          }
        },
        {
          label: "订单时间",
          prop: "createTime"
        },
        {
          label: "状态",
          prop: "status",
          scopedSlots: {
            default: (scope: any) => {
              const { label, tagType } = (member_STATU_ENUM[scope.row.status] || {});
              if (!label) {
                return "--"
              }
              return (
                <el-tag class="ml-2" type={tagType}>{label}</el-tag>
              )
            }
          }
        },
        {
          label: "服务周期",
          prop: "serviceStartDate",
          formatter: (row: any) => {
            const {serviceStartDate, serviceEndDate} = row;
            return [serviceStartDate, serviceEndDate].join(' ~ ');
          }
        },
        {
          label: "发票",
          prop: "invoiceFileName",
          width: 160,
          scopedSlots: {
            default: (scope: any) => {
              const { applyCode, invoiceFileName, servicePeriod} = scope.row;
              const disabled = !invoiceFileName || servicePeriod === 0;
              if (disabled) {
                return "--"
              }
              return (
                <> 
                  <glExportBtn
                    disabled={disabled}
                    exportData={
                      {
                        exportFn: downloadRechargeFile,
                        params: { applyCode },
                        FileName: invoiceFileName
                      }
                    }
                    exportType="link"
                    exportBtnName="下载"
                  />
                </> 
              )
            }
          }
        }
      ];
    }
  }
});
</script>
<style lang="scss">
.memberList {
  .header {
    .header-box {
      position: relative;
      width: 368px;
      height: 148px;
      border-radius: 6px;
      padding-top: 4px;
      background: linear-gradient(44deg,#3548F7 0%,#357CF7 100%);
      overflow: hidden;
      cursor: pointer;
      .header-wrapper {
        height: 100%;
        background: linear-gradient(5deg,#E6E2FF 0%,#F4F3FF 100%);
        padding: 24px 16px 24px 32px;
        position: relative;
        .title {
          font-size: 14px;
          font-family: Poppins-Regular;
          font-weight: 400;
          color: #677392;
          line-height: 22px;
          margin-bottom: 20px;
        }
        .value {
          font-size: 28px;
          font-family: Poppins-Regular,Poppins;
          // font-weight: 600;
          color: #2d3446;
          line-height: 24px;
          span {
            font-size: 14px;
            vertical-align: baseline;
          }
        }
      }
      .el-button {
        position: absolute;
        right: 20px;
        bottom: 20px;
        padding: 12px 25px;
      }
    }
  }
}
</style>

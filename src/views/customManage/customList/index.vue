<template>
  <div class="layout-container">
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
              v-model="searchForm.payType"
              placeholder="付款类型"
              clearable
            >
              <el-option
                v-for="item in payType_ENUM_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchForm.businessType"
              placeholder="业务类型"
              clearable
            >
              <el-option
                v-for="item in businessType_ENUM_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-button
            :loading="listData.isLoading"
            type="primary"
            @click="handleSearch"
          >
            查询
          </el-button>
        </div>
      </el-form>
    </div>
    <div class="global-model mb-20">
      <el-button
        type="primary"
        @click="openAddModal('ADD')"
      >
        添加客户
      </el-button>
      <div class="global-model-right">
        <glExportBtn 
          :exportData="{
            exportFn: exportCustomer,
            params: listData.searchParams,
            FileName: '客户列表.xlsx'
          }"
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
        @size-change="handleSearch"
        @current-change="getList"
      />
    </div>

    <!-- 添加/编辑用户 -->
    <customModal
      ref="customModal"
      :dialog-data="dialogData"
      @submit="getList(listData.current)"
    />

    <!-- 重置密码 -->
    <rebateListDialog
      ref="rebateListDialog"
      :dialog-data="dialogData"
      @submit="getList(listData.current)"
    />
    <!-- 资产授权 -->
    <authAssetsDialog 
      ref="authAssetsDialog"
      :dialog-data="dialogData"
    />
  </div>
</template>

<script lang="tsx">
import type { Ref } from "vue";
import { h, defineComponent, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Edit,
  CreditCard,
} from '@element-plus/icons-vue'

import { getcustomerPage, exportCustomer } from "@/api/custom";
import customModal from "./customModal.vue";
import rebateListDialog from "./rebateListDialog.vue";
import authAssetsDialog from "./authAssetsDialog.vue"
import { 
  glUseCustomerListSelect
} from "@/utils/globalSearchSelect"
import {
  payType_ENUM, payType_ENUM_OPTIONS,
  businessType_ENUM, businessType_ENUM_OPTIONS
} from "@/utils/enum";
/**
 * @description: 表格函数
 * @param {*}
 */
function usetable() {
    const store = useStore()
    const mediaObj = store.state.user.mediaObj;
    const searchForm = reactive({
      customerCode: '',
      payType: '',
      businessType: '',
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
        const res = await getcustomerPage(params)
        listData.info = (res.data.data || []).map(t => {
          const platformList = (t.platforms || []).map(k => {
            return {id: k, mediaName: mediaObj[k] }
          })
          return { ...t, customerCode: t.code, platformList }
        });
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
  const dialogData = ref({})
  
  // 添加客户
  const customModal: Ref<any|null> = ref(null)
  const openAddModal = ($type = "ADD", data = {}) => {
    dialogData.value = {
      $type,
      ...data
    };
    // console.log(`%c qjlog`, 'color:#4278ff;', customModal)
    customModal.value.visible = true;
  }

  // 利润设置
  const rebateListDialog: Ref<any|null> = ref(null)
  const openRebateDialog = (data = {}) => {
    if (!data.platformList.length) {
      ElMessage({
        type: "warning",
        message: "请先设置合作媒体"
      });
      return
    }
    dialogData.value = {
      ...data
    };
    rebateListDialog.value.visible = true;
  }
  

  // 授权客户
  const authAssetsDialog: Ref<any|null> = ref(null)
  const openAuthAssetsDialog = (data = {}) => {
    dialogData.value = {
      ...data
    };
    // console.log(`%c qjlog`, 'color:#4278ff;', customModal)
    authAssetsDialog.value.visible = true;
  }

  return { 
    dialogData, openAddModal, customModal, 
    openRebateDialog, rebateListDialog,
    authAssetsDialog, openAuthAssetsDialog
  }
}

export default defineComponent({
  components: {
    customModal,
    rebateListDialog,
    authAssetsDialog
  },
  setup(props, ctx) {
    const { searchForm, listData, getList } = usetable();

     const {
      dialogData, openAddModal, customModal, 
      openRebateDialog, rebateListDialog,
      authAssetsDialog, openAuthAssetsDialog
     } = useoperate();

    const { glCustomerListData, glGetCustomerList } = glUseCustomerListSelect();
    const handleSearch = () => {
      listData.searchParams= {...searchForm}
      listData.current = 1
      getList();
    }

    onMounted(() => {
      handleSearch()
    })
    return {
      Edit,
      CreditCard,
      glCustomerListData, glGetCustomerList,
      payType_ENUM_OPTIONS,
      businessType_ENUM_OPTIONS,
      searchForm,
      handleSearch,
      listData, getList,
      exportCustomer,

      dialogData, openAddModal, customModal, 
      openRebateDialog, rebateListDialog,
      authAssetsDialog, openAuthAssetsDialog
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
          prop: "code",
          width: 120
        },
        {
          label: "客户名称",
          prop: "name"
        },
        {
          label: "客户简称",
          prop: "abbName"
        },
        {
          label: "付款类型",
          prop: "payTypeName"
        },
        {
          label: "业务类型",
          prop: "businessTypeName"
        },
        {
          label: "合作媒体",
          prop: "platformList",
          width: 240,
          formatter: row => {
            return row.platformList.map(t => t.mediaName).join('、');
          }
        },
        {
          label: "商务",
          prop: "businessUserName"
        },
        {
          label: "运营人",
          prop: "operatorName"
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 160
        },
        {
          label: "操作",
          prop: "statusDom",
          fixed: "right",
          width: 260,
          scopedSlots: {
            default: (scope: any) => {
              return (
                <> 
                  <el-button
                    type="primary"
                    icon={Edit}
                    link
                    onClick={() => _this.openAddModal('EDIT', scope.row)}
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="primary"
                    icon={Edit}
                    link
                    onClick={() => _this.openAuthAssetsDialog(scope.row)}
                  >
                    授权
                  </el-button>
                  <el-button
                    type="primary"
                    icon={CreditCard}
                    link
                    onClick={() => _this.openRebateDialog(scope.row)}
                  >
                    利润设置
                  </el-button>
                </> 
              )
            }
          }
        },
      ];
    }
  }
});
</script>
<style lang="scss">

</style>

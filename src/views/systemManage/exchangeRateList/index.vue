<template>
  <div class="layout-container">
    <div class="global-search">
      <el-form :model="searchForm">
        <div class="global-form">
          <el-form-item>
            <el-select
              v-model="searchForm.froms"
              placeholder="from"
              clearable
            >
              <el-option
                v-for="item in CURRENCY_ENUM_OPTIONS"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchForm.tos"
              placeholder="to"
              clearable
            >
              <el-option
                v-for="item in CURRENCY_ENUM_OPTIONS"
                :key="item"
                :label="item"
                :value="item"
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
        @click="openUserModal('ADD')"
      >
        添加汇率
      </el-button>
    </div>
    <div
      v-loading="listData.isLoading"
      class="global-module"
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
    </div>

    <!-- 添加/编辑用户 -->
    <rateDialog
      ref="rateDialog"
      :dialog-data="dialogData"
      @submit="getList"
    />
  </div>
</template>

<script lang="ts">
import { h, defineComponent, ref, reactive, onMounted } from 'vue'
import type { Ref } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { getExchangeRateList } from "@/api/system";
import rateDialog from "./rateDialog.vue";

import {
  CURRENCY_ENUM_OPTIONS
} from "@/utils/enum";
/**
 * @description: 表格函数
 * @param {*}
 */
function usetable() {
    const searchForm = reactive({
      froms: '',
      tos: '',
    })
    const listData = reactive({
      isLoading: false,
      searchParams: {},
      info: []
    })
    const getList = async() => {
      try {
        const params = {
          ...listData.searchParams
        };
        listData.isLoading = true;
        const res = await getExchangeRateList(params);
        listData.info = (res.data.data || []);
      } catch (error) {
        listData.info = [];
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
  const rateDialog = ref(null)
  const dialogData = ref({})

  const openUserModal = ($type = "ADD", data = {}) => {
    dialogData.value = {
      $type,
      ...data
    };
    rateDialog.value.visible = true;
  }

  // 离职
  const resignUser = (row: any, fn) => {
    const { loginName, orgId } = row;
    const params = {
      oldUserName: loginName,
      curOrgId: orgId
    };
    ElMessageBox.confirm("确定该成员离职吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      beforeClose: async(action, ctx, close) => {
        try {
          if (action !== "confirm") {
            close();
            return;
          }
          // ctx.confirmButtonLoading = true;
          // // await userTransferAssets(params);

          // ElMessage({
          //   type: "success",
          //   message: "操作成功"
          // });
          fn();
          // ctx.confirmButtonLoading = false;
          close();
        } catch (error) {
          ctx.confirmButtonLoading = false;
        }
      }
    });
  }
  return {
    dialogData, rateDialog, openUserModal,
    resignUser
  }
}

export default defineComponent({
  components: {
    rateDialog
  },
  setup(props, ctx) {
    const statusOptions = reactive([])
    const { searchForm, listData, getList } = usetable();

     const {
      dialogData, rateDialog, openUserModal, 
      resetPswModal, openResetPswModal,
      resignUser
     } = useoperate();


    const handleSearch = () => {
      listData.searchParams= {...searchForm}
      getList();
    }
    onMounted(() => {
      handleSearch()
    })
    return {
      CURRENCY_ENUM_OPTIONS,
      statusOptions,
      handleSearch,
      searchForm, listData, getList,

      dialogData, rateDialog, openUserModal, 
      resetPswModal, openResetPswModal,
      resignUser
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
          label: "From",
          prop: "froms"
        },
        {
          label: "To",
          prop: "tos"
        },
        {
          label: "汇率",
          prop: "rate",
          width: 160,
        },
        {
          label: "更新时间",
          prop: "updateTime",
          width: 160,
        }
      ];
    }
  }
});
</script>
<style lang="scss">

</style>

<!-- 返点列表-->
<template>
  <div>
    <el-dialog
      :title="`关联${agentIdLabel}`"
      v-model="visible"
      width="800px"
      @open="openDialog"
      @close="closeDialog"
    >
      <div class="global-model mb-20">
        <el-button
          type="primary"
          @click="openRebateSet('ADD', { ...listData.searchParams })"
        >
          新增
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
          <el-table-column
            label="操作"
            fixed="right"
            width="160"
          >
            <template #default="scope">
              <el-button
                type="danger"
                :icon="Delete"
                link
                @click="deleteRebate(scope.row, getList)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>


    <rebateSet
      ref="rebateSet"
      :rebateData="rebateData"
      @submit="getList"
    ></rebateSet>
  </div>
</template>
<script lang="ts">
import { h, defineComponent, ref, reactive, inject, toRefs } from 'vue'
import type { Ref } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { listUserAgent, removeUserAgent } from "@/api/channel";
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'
import rebateSet from "./rebateSet.vue";

/**
 * @description: 表格函数
 * @param {*}
 */
function usetable() {
    const listData = reactive({
      isLoading: false,
      searchParams: {
        platform: ''
      },
      info: [],
      pageSize: 10,
      pageNo: 1,
      total: 0
    })
    const getList = async() => {
      try {
        const params = {
          pageSize: listData.pageSize,
          pageNo: listData.pageNo,
          ...listData.searchParams
        };
        listData.isLoading = true;
        const res = await listUserAgent(params);
        listData.info = (res.data || []);
        listData.total = res.data.total;
      } catch (error) {
        listData.info = [];
        listData.total = 0;
      }
      listData.isLoading = false;
    }

    return { listData, getList }
}

/**
 * @description: 操作权限
 * @param {*}
 */
function useoperate() {
  console.log(`%c qjlog`, 'color:#4278ff;')
  const rebateData = ref({})
  
  // 添加客户
  const rebateSet: Ref<any|null> = ref(null)
  const openRebateSet = ($type = "ADD", data = {}) => {
    rebateData.value = {
      $type,
      ...data
    };
    // console.log(`%c qjlog`, 'color:#4278ff;', rebateDialog)
    rebateSet.value.visible = true;
  }

  // 删除
  const deleteRebate = (row: any, fn: any) => {
    ElMessageBox.confirm(`确定该条数据吗？`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      beforeClose: async(action, ctx, close) => {
        try {
          if (action !== "confirm") {
            close();
            return;
          }
          ctx.confirmButtonLoading = true;
          await removeUserAgent({id: row.id});
          ElMessage({
            type: "success",
            message: "操作成功"
          });
          fn()
          ctx.confirmButtonLoading = false;
          close();
        } catch (error) {
          ctx.confirmButtonLoading = false;
        }
      }
    });
  }
  return { 
    openRebateSet, rebateData, rebateSet,
    deleteRebate
  }
}

export default defineComponent({
  components: {rebateSet},
  props: {
    dialogData: Object
  },
  setup(props) {
    //  const { dialogData } = toRefs(props)
    const agentIdLabel: any = inject("agentIdLabel");
    const visible = ref(false)

    const { listData, getList } = usetable();
    const {
      rebateData, rebateSet, openRebateSet,
      deleteRebate
    } = useoperate();



    const openDialog = () => {
      const { platform, userId } = props.dialogData;
      listData.searchParams = {
        platform, userId
      }
      getList()
    }
    const closeDialog = () => {
      listData.info = []
    }
    const tabClick = (a:any) => {
      listData.searchParams.platform = a;
      getList()
    }

    return {
      Delete,
      Edit,
      agentIdLabel,
      visible,
      listData, getList,

      rebateData, rebateSet, openRebateSet,
      deleteRebate,
      tabClick,
      openDialog, closeDialog,
    }
  },
  computed: {
    tableCol() {
      const _this = this;
      return [
        {
          label: `${_this.agentIdLabel}`,
          prop: "agentId"
        },
        {
          label: `${_this.agentIdLabel}名称`,
          prop: "agentName"
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 160
        }
      ];
    }
  }
});
</script>

<style lang="scss" scoped>
</style>

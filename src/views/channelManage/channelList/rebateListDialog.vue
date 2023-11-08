<!-- 返点列表-->
<template>
  <div>
    <el-dialog
      title="利润设置"
      v-model="visible"
      width="800px"
      @open="openDialog"
      @close="closeDialog"
    >
      <el-tabs v-model="listData.searchParams.platform" class="demo-tabs" @tab-change="tabClick">
        <el-tab-pane
          v-for="t in platformOptions"
          :label="t.mediaName"
          :key="t.id"
          :name="t.id"
        />
      </el-tabs>
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
                type="primary"
                :icon="Edit"
                link
                @click="openRebateSet('EDIT', scope.row)"
              >
                编辑
              </el-button>
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
        <!-- <el-pagination
          class="mt-20"
          :total="listData.total"
          :page-sizes="[10, 20, 30, 40]"
          v-model:current-page="listData.pageNo"
          v-model:page-size="listData.pageSize"
          layout="total,sizes, prev, pager, next, jumper"
          @size-change="getList"
          @current-change="getList"
        /> -->
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
import { h, defineComponent, ref, reactive, defineProps, toRefs } from 'vue'
import type { Ref } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { listChannelRebate, deleteChannelRebate } from "@/api/channel";
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
        const res = await listChannelRebate(params);
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
    ElMessageBox.confirm("确定删除该月返点吗？", "提示", {
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
          await deleteChannelRebate(row.id);
          // await new Promise((resolve) => {
          //   setTimeout(() => { resolve(2) }, 5000)
          // })
          
          if (fn) {
            fn()
          }
          ElMessage({
            type: "success",
            message: "操作成功"
          });
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

    const visible = ref(false)
    const platformOptions:any = ref([])

    const { listData, getList } = usetable();
    const {
      rebateData, rebateSet, openRebateSet,
      deleteRebate
    } = useoperate();



    const openDialog = () => {
      const { platformList, channelCode } = props.dialogData;
      platformOptions.value = platformList;
      listData.searchParams = {
        channelCode,
        platform: platformOptions.value[0].id
      }
      getList()
      // console.log(`%c dialogData`, 'color:#4278ff;', platformOptions)
    }
    const closeDialog = () => {
      listData.info = []
      // Object.assign(listData,{
      //   isLoading: false,
      //   searchParams: {
      //     platform: ''
      //   },
      //   info: [],
      //   pageSize: 10,
      //   pageNo: 1,
      //   total: 0
      // })
    }
    const tabClick = (a:any) => {
      listData.searchParams.platform = a;
      getList()
    }

    return {
      Delete,
      Edit,
      visible,
      platformOptions,
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
          label: "月份",
          prop: "startMonth",
          width: 120
        },
        {
          label: "返点比例",
          prop: "rebateRate",
          formatter: row => {
            return `${row.rebateRate}%`;
          },
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

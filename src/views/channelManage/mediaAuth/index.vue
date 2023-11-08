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
    <div class="global-model mb-20">
      <el-button
        @click="bindMediaAccount()"
      >
        <SvgIcon v-if="[1, 2, 3].includes(platform)" :iconClass="mediaName" size="16" />
        <span class="ml-5">登录{{mediaName}}绑定账户</span>
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
          width="180"
        >
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Operation"
              link
              @click="getUnBindUser(scope.row)"
            >
              解绑
            </el-button>
            <el-button
              type="primary"
              :icon="CreditCard"
              link
              @click="openRebateListModal(scope.row)"
            >
              关联{{agentIdLabel}}
            </el-button>
          </template>
        </el-table-column>
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

    <!-- 关联BM -->
    <rebateListDialog
      ref="rebateListDialog"
      :dialog-data="dialogData"
    />
  </div>
</template>

<script lang="ts">
import { h, defineComponent, ref, reactive, computed, provide, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Operation, CreditCard
} from '@element-plus/icons-vue'
import { mediaAuthPage, mediaAuthOauth, unBindUser } from "@/api/channel";
import rebateListDialog from "./rebateListDialog.vue";

import {
  agentId_ENUM
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
        const res = await mediaAuthPage(params);
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
    rebateListDialog
  },
  setup(props, ctx) {
    const store = useStore()
    const mediaOptions = store.state.user.mediaOptions.filter(t => [1, 2, 3].includes(t.id));
    const mediaObj = store.state.user.mediaObj;

    const { platform, searchForm, listData, getList } = usetable();
    const mediaName = computed(() => mediaObj[platform.value])

    const agentIdLabel = computed(() => agentId_ENUM[platform.value])
    provide('agentIdLabel', agentIdLabel);
    const handleSearch = () => {
      listData.searchParams= {...searchForm }
      listData.current = 1
      getList();
    }

    // 解绑
    const getUnBindUser = (row: any) => {
      const { userId } = row;
      const params = {
        userId,
      };
      if (!userId) {
        ElMessage({
          type: "error",
          message: "userId不存在"
        });
        return
      }
      ElMessageBox.confirm("确定解绑该账号吗？", "提示", {
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
            await unBindUser(params);

            ElMessage({
              type: "success",
              message: "操作成功"
            });
            handleSearch();
            ctx.confirmButtonLoading = false;
            close();
          } catch (error) {
            console.log(`%c qjlog`, 'color:#4278ff;', error)
            ctx.confirmButtonLoading = false;
          }
        }
      });
    }


     // 关联BM
    const dialogData = ref({})
    const rebateListDialog = ref(null)
    const openRebateListModal = (data = {}) => {
      dialogData.value = {
        platform,
        ...data
      };
      // console.log(`%c qjlog`, 'color:#4278ff;', channelDialog)
      rebateListDialog.value.visible = true;
    }

    const tabChange = (a = 1) => {
      // console.log(`%c platform`, 'color:#4278ff;', a)
      platform.value = a;

      listData.searchParams= {...searchForm }
      listData.current = 1
      getList();
    }
    onMounted(() => {
      handleSearch()
    })
    
    const bindMediaAccount = async () => {
      try {
        const res = await mediaAuthOauth(platform.value);
        window.open(res.data);
      } catch (error) {
        
      }
    }

    return {
      Operation, CreditCard,
      platform,
      mediaName,
      agentIdLabel,
      mediaOptions,
      handleSearch,
      tabChange,
      searchForm, listData, getList,
      bindMediaAccount,
      getUnBindUser,
      dialogData, rebateListDialog, openRebateListModal
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
          label: "账户ID",
          prop: "userId",
          width: 200
        },
        {
          label: "账户名称",
          prop: "name"
        },
        {
          label: "邮箱",
          prop: "email"
        },
        {
          label: "状态",
          prop: "status",
          formatter: row => {
            return row.status === 1 ? "正常" : "解绑";
          }
        },
        {
          label: "授权时间",
          prop: "updateTime"
        }
      ];
    }
  }
});
</script>
<style lang="scss">

</style>

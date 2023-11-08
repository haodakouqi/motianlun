<template>
  <div class="userList">
    <div class="global-search">
      <el-form :model="searchForm">
        <div class="global-form">
          <el-form-item>
            <el-input v-model="searchForm.loginName" placeholder="邮箱" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.userName" placeholder="用户名" />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchForm.status"
              placeholder="状态"
              clearable
            >
              <el-option
                v-for="item in user_STATUS_ENUM_OPTIONS"
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
        @click="openUserModal('ADD')"
      >
        添加用户
      </el-button>
    </div>
    <div v-loading="listData.isLoading">
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
    <UserModal
      ref="userModal"
      :dialog-data="dialogData"
      @submit="getList()"
    />

    <!-- 重置密码 -->
    <ResetPswModal
      ref="resetPswModal"
      :dialog-data="dialogData"
      @submit="getList()"
    />
  </div>
</template>

<script lang="tsx">
import { 
  h, defineComponent, ref, reactive, provide, watch, onMounted, computed
} from 'vue'
import type { Ref } from "vue";
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox} from 'element-plus'
import UserModal from "./userModal.vue";
import ResetPswModal from "./resetPswModal.vue";
import { updateUserStatus, getUserList, getDepartUser } from "@/api/user";

import {
  SetUp,
  Edit,
  Aim,
} from '@element-plus/icons-vue'

import {
  user_STATUS_ENUM, user_STATUS_ENUM_OPTIONS, position_ENUM
} from "@/utils/enum";

/**
 * @description: 表格函数
 * @param {*}
 */
function usetable() {
    const searchForm = reactive({
      loginName: '',
      userName: '',
      status: '',
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
        const res = await getUserList(params);
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
  const dialogData = ref({})
  
  const userModal: Ref<any|null> = ref(null)
  const openUserModal = ($type = "ADD", data = {}) => {
    console.log(`%c qjlog`, 'color:#4278ff;', this)
    dialogData.value = {
      $type,
      ...data
    };
    userModal.value.visible = true;
  }

  
  // 重置密码
  const resetPswModal: Ref<any|null> = ref(null)
  const openResetPswModal = (data = {}) => {
    dialogData.value = {
      ...data
    };
    resetPswModal.value.visible = true;
  }


  // 激活或停用
  const activeUser = (row: any, fn: any) => {
    const status = row.status === 1 ? 0 : 1;
    const activeLabel = user_STATUS_ENUM[row.status]?.acitveBtntext;
    const params = {
	    userId: row.id,
      status,
    };
    ElMessageBox.confirm(`确定${activeLabel}该成员吗？`, "提示", {
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
          await updateUserStatus(params);

          ElMessage({
            type: "success",
            message: "操作成功"
          });
          if (fn) {
            fn();
          }
          ctx.confirmButtonLoading = false;
          close();
        } catch (error) {
          console.log(`%c qjlog`, 'color:#4278ff;', error)
          ctx.confirmButtonLoading = false;
        }
      }
    });
  }

  // 离职
  const departUser = (row: any, fn: any) => {
    const params = {
	    userId: row.id,
    };
    ElMessageBox.confirm(`确定该成员离职吗？`, "提示", {
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
          await getDepartUser(params);

          ElMessage({
            type: "success",
            message: "操作成功"
          });
          if (fn) {
            fn();
          }
          ctx.confirmButtonLoading = false;
          close();
        } catch (error) {
          console.log(`%c qjlog`, 'color:#4278ff;', error)
          ctx.confirmButtonLoading = false;
        }
      }
    });
  }
  return { 
    dialogData, userModal, openUserModal, 
    resetPswModal, openResetPswModal,
    activeUser, departUser
  }
}

export default defineComponent({
  components: {
    UserModal,
    ResetPswModal
  },
  setup(props, ctx) {
    const store = useStore();
    const isAdminUser = computed(() => store.state.user.userInfo.adminUser)
    const activeNode: any = ref({})
    provide('activeNode', activeNode);

    const { searchForm, listData, getList } = usetable();

     const {
      dialogData, userModal, openUserModal, 
      resetPswModal, openResetPswModal,
      activeUser, departUser
     } = useoperate();


    const handleSearch = () => {
      listData.searchParams= {...searchForm}
      listData.current = 1
      getList();
    }

    onMounted(() => {
      handleSearch()
    })
    watch(activeNode, (newVal) => {
      handleSearch()
    })
    return {
      SetUp,
      Edit,
      Aim,
      user_STATUS_ENUM,
      user_STATUS_ENUM_OPTIONS,
      isAdminUser,
      handleSearch,
      searchForm,
      listData, getList,

      dialogData, userModal, openUserModal, 
      resetPswModal, openResetPswModal,
      activeUser, departUser
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
          label: "邮箱",
          prop: "loginName",
          'min-width': 200
        },
        {
          label: "用户名",
          prop: "userName",
          'min-width': 200
        },
        {
          label: "手机号",
          prop: "phone",
          width: 150
        },
        {
          label: "职位",
          prop: "position",
          width: 80,
          formatter: (row:any) => {
            return position_ENUM[row.position]?.label;
          }
        },
        {
          label: "角色",
          prop: "roleNames",
          'min-width': 200,
          formatter: (row:any) => {
            return row.roleNames && row.roleNames.join('、')
          }
        },
        {
          label: "状态",
          prop: "statusDom",
          width: 80,
          scopedSlots: {
            default: (scope: any) => {
              return (
                <el-switch
                  onClick={() => _this.activeUser(scope.row, _this.getList)}
                  model-value={scope.row.status}
                  active-value={1}
                  inactive-value={0}
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                />
              )
            }
          }
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
                    onClick={() => _this.openUserModal('EDIT', scope.row)}
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="danger"
                    icon={Aim}
                    link
                    onClick={() => _this.openResetPswModal(scope.row)}
                  >
                    重置密码
                  </el-button>
                  <el-button
                    icon={SetUp}
                    link
                    onClick={() => _this.departUser(scope.row, _this.getList)}
                  >
                    离职
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
.userList {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

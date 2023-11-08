<template>
  <div class="department">
    <el-card class="global-el-card-box">
      <template #header>
        <div class="card-header">
          <span>角色列表</span>
          <el-button type="primary" @click="openRoleModal">新增</el-button>
        </div>
      </template>
      <div v-loading="isLoading">
        <el-tree
          ref="tree"
          class="my-tree"
          :data="data"
          :props="defaultProps"
          :expand-on-click-node="false"
          node-key="id"
          highlight-current
          @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <span class="department-node-btn">
              <span>{{ node.label }}</span>
              <el-dropdown v-if="data.type !== 1" @command="(a) => treecommand(a, data)">
                <span @click.stop class="el-dropdown-link">
                  <el-icon color="var(--el-color-primary-light-5)" :size="14"><More /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="EDIT">编辑</el-dropdown-item>
                    <el-dropdown-item command="DELETE">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </span>
          </template>
        </el-tree>
      </div>
    </el-card>


    <!-- 添加/编辑用户 -->
    <roleModal
      ref="roleModal"
      :dialog-data="dialogData"
      @submit="getList"
    />
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { defineComponent, ref, inject, nextTick } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'

import { getRoleApi, removeRole } from "@/api/user";
import roleModal from "./roleModal.vue";


/**
 * @description: 操作权限
 * @param {*}
 */
function useoperate() {
  const dialogData = ref({})

  const roleModal: Ref<any|null> = ref(null)
  const openRoleModal = ($type = "ADD", data = {}) => {
     dialogData.value = {
      $type,
      ...data
    };
    // console.log(`%c qjlog`, 'color:#4278ff;', userModal)
    roleModal.value.visible = true;
  }
  // 离职
  const deleteRole = (row: any, fn) => {
    const { id } = row;
    const params = {
      id
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
          ctx.confirmButtonLoading = true;
          await removeRole(params);

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
          ctx.confirmButtonLoading = false;
        }
      }
    });
  }
  return { 
    dialogData, roleModal, openRoleModal,
    deleteRole
  }
}

export default defineComponent({
  components: {
    roleModal,
  },
  setup() {
    const activeNode: any = inject("activeNode");

    
    const data = ref([]);
    const tree: Ref<any|null> = ref(null)

     const {
      dialogData, roleModal, openRoleModal,
      deleteRole
     } = useoperate();

    const isLoading = ref(false)
    const getList = async () => {
      let params = {};
      isLoading.value = true;
      const res = await getRoleApi(params)
      isLoading.value = false;
      data.value = res.data;
      activeNode.value = res.data[0];
      nextTick(() => {
        tree.value && tree.value.setCurrentKey(activeNode.value.id)
      })
    };

    const treecommand = (command:any, b) => {
      if (command === "EDIT") {
        openRoleModal('EDIT', b)
      } else if (command === "DELETE") {
        deleteRole(b, getList)
      }
    }
    const handleNodeClick = (row: any) => {
      activeNode.value = row;
    };
    getList();
    
    return {
      isLoading,
      data,
      tree,
      defaultProps: {
        children: "children",
        label: "name",
      },
      handleNodeClick,
      treecommand,
      getList,
      dialogData, roleModal, openRoleModal,
      deleteRole
    };
  },
});
</script>

<style lang="scss">
.department {
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .my-tree {
    --el-tree-node-content-height: 36px;
    :deep(.el-tree-node__content) {
      height: 40px;
    }
    :deep(.el-tree-node.is-current>.el-tree-node__content) {
      background-color: rgba(64, 158, 255, 0.4);
    }
    :deep(.el-tree-node>.el-tree-node__content) {
      transition: 0.2s;
    }
    .department-node-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      line-height: 36px;
    }
  }
}
</style>
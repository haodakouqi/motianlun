<template>
  <div class="roleList">
    <div class="roleList-content">
      <div class="tree">
        <department />
      </div>
      <el-card class="global-el-card-box" header="部门成员">
        <template #header>
          <div class="card-header">
            <span>部门成员</span>
            <el-button
              type="primary"
              :loading="isSaveLoading"
              @click="saveRole()"
              v-if="isAdmin"
            >
              保存
            </el-button>
          </div>
        </template>
        <div class="roleList-tree" v-loading="isLoading">
          <el-tree
            ref="treeRef"
            :data="resourcesTree"
            default-expand-all
            :props="props"
            :show-checkbox="isAdmin"
            node-key="id"
          />
        </div>
      </el-card>
    </div>

  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, ref, computed, onMounted, provide, watch, nextTick} from 'vue'
import type { Ref } from "vue";
import { ElTree, ElMessage, ElMessageBox } from 'element-plus'
import department from "./department.vue";
import { getMenuTree, getRoleMenuIds, updateRoleMenu } from "@/api/user";



export default defineComponent({
  components: {
    department
  },
  setup(props, ctx) {
    const roleId: any = ref(null);

    const activeNode: any = ref({
      id: null
    })
    provide('activeNode', activeNode);
    watch(activeNode, (newVal) => {
      roleId.value = activeNode.value.id;
      getSelectMenu()
    })

    // 是否是管理员
    const isAdmin = computed(() => activeNode.value.type !== 1)

    
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const resourcesTree = ref([])
    const getAllMenuTree = async () => {
      const res = await getMenuTree();
      // const a = JSON.stringify(res.data).replace(`"children":[]`, '"children":[],"classTree": "lastitem"')
      resourcesTree.value = res.data;
      // console.log(`%c getAllMenuTree`, 'color:#4278ff;',JSON.parse(a))
    }

    const isLoading = ref(false)
    const getSelectMenu = async () => {
      isLoading.value = true;
      const res = await getRoleMenuIds({ roleId: roleId.value });
      isLoading.value = false;
      nextTick(() => {
        treeRef.value!.setCheckedKeys(res.data, false)
      })
    }
    const isSaveLoading = ref(false)
    const saveRole = async () => {
      try {
        const menuIds = treeRef.value!.getCheckedKeys()
  
        isSaveLoading.value = true;
        await updateRoleMenu({ roleId: roleId.value, menuIds })
        isSaveLoading.value = false;
        ElMessage({
          type: "success",
          message: "操作成功"
        });
        
      } catch (error) {
        isSaveLoading.value = false;
      }
    }
    onMounted(() => {
      getAllMenuTree();
    })
    return {
      props: {
        value: 'id',
        label: 'name',
        children: 'children',
        class: "classTree"
      },
      isAdmin,
      isSaveLoading,
      treeRef,
      isLoading,
      resourcesTree,
      saveRole
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
          label: "角色名",
          prop: "name"
        },
        {
          label: "添加时间",
          prop: "createTime",
          width: 160,
        }
      ];
    }
  }
});
</script>
<style lang="scss">
.roleList {
  height: 100%;
  display: flex;
  flex-direction: column;
  .roleList-content {
    flex: 1;
    display: flex;
    gap: 10px;
    overflow: hidden;
    .tree {
      width: 300px;
    }

    .global-el-card-box {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .roleList-tree {
        .el-tree-node__children {
          display: flex;
        }
      }
    }
  }
}
</style>

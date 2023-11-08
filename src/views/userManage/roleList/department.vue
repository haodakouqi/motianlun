<template>
  <div class="department">
    <el-card class="global-el-card-box">
      <template #header>
        <div class="card-header">
          <span>角色列表</span>
          <el-button type="primary" ref="addRoleRef" @click="handlebtn('ADD')">新增</el-button>
        </div>
      </template>
      <div class="role-box" v-loading="roleData.isLoading">
        <ul class="role_name_ul">
          <li v-for="(item, index) in roleData.data" :key="index" class="role_name_li">
            <div
              ref="refInputRole"
              v-if="formData.id === item.id && formData.isInput"
              key="input"
              class="name_input"
            >
              <el-input
                id="roleInputId"
                v-model.trim="formData.name"
                placeholder="请输入角色名"
                style="width: 100%"
              >
                <template #suffix>
                  <el-icon @click.stop="submitForm" class="btnOk" color="var(--el-color-primary)"><Check /></el-icon>
                </template>
              </el-input>
            </div>
            <div
              v-else
              key="handle"
              class="name_item"
              :class="[activeNode.id === item.id ? 'active' : '']"
              @click.stop="nodeClick(item, index)"
            >
              <span class="name_item_title">
                {{ item.name }}
              </span>
              <!-- 功能操作 -->
              <el-dropdown
                v-if="item.type !== 1" @command="(a) => handlebtn(a, item)"
                :teleported="false"
                trigger="click"
              >
                <span @click.stop class="btn">
                  <el-icon color="var(--el-color-primary-light-5)" :size="14"><More /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <span @click.stop ref="editRoleRef" >
                      <el-dropdown-item command="EDIT">编辑</el-dropdown-item>
                    </span>
                    <el-dropdown-item @click.stop command="DELETE">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { defineComponent, ref, inject, reactive, onMounted, onUnmounted, nextTick } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { getRoleApi, removeRole, postAddRole, updateRole } from "@/api/user";

export default defineComponent({
  setup() {
    const activeNode: any = inject("activeNode");

    const formData = reactive({
      roleType: "",
      isInput: false,
      id: null,
      name: ""
    })
    const roleData = reactive({
      isLoading: false,
      data: []
    });

    const getList = async (type = "noINIT") => {
      try {
        roleData.isLoading = true;
        const res = await getRoleApi({})
        roleData.isLoading = false;
        roleData.data = res.data;
        if (type === "INIT") {
          activeNode.value = res.data[0];
        }
      } catch (error) {
        roleData.data = []
        roleData.isLoading = false;
        activeNode.value = null;
      }
    };
    const nodeClick = (row: any) => {
      formData.isInput = false;
      activeNode.value = row;
    };

    // 离职
    const deleteRole = (row: any) => {
      const { id } = row;
      const params = {
        id
      };
      ElMessageBox.confirm("确定删除该角色吗？", "提示", {
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
            getList("INIT")
            ctx.confirmButtonLoading = false;
            close();
          } catch (error) {
            ctx.confirmButtonLoading = false;
          }
        }
      });
    }
    
    function setFocus() {
      nextTick(() => {
        const roleInputId = document.getElementById("roleInputId");
        roleInputId.focus()
      })
    }

    // 操作函数
    const handlebtn = (roleType:any, b) => {
      if (roleType === "ADD") {
        roleData.data = roleData.data.filter(t => t.id !== "NewAdd");
        Object.assign(formData, {
          roleType, 
          isInput: true,
          id: "NewAdd",
          name: ""
        })
        roleData.data.push({ id: "NewAdd", name: ""})
        setFocus()
      } else if (roleType === "EDIT") {
        Object.assign(formData, {
          roleType,
          isInput: true,
          id: b.id,
          name: b.name
        })
        setFocus()
      } else if (roleType === "DELETE") {
        deleteRole(b)
      }
    }
   
    
    /**
     * @description: 提交
     * @param {*}
     */
    const submitForm = async() => {
      try {
        // console.log(`%c qjlog`, 'color:#4278ff;', 11)
        // return
        const { id, name } = formData
        if (formData.roleType === "EDIT") {
          await updateRole({ id, name })
          // nodeClick({ id, name })
        } else {
          await postAddRole({ name, menuIds: [] })
        }
        ElMessage({
          type: "success",
          message: "操作成功"
        });
        Object.assign(formData, {
          id: null,
          isInput: false,
          roleType: "",
          name: ""
        })
        getList("INIT")
        
      } catch (error) {
        console.log(`%c submitForm`, 'color:#4278ff;', error)
      }
    }

    const refInputRole: Ref<any|null> = ref(null);
    const addRoleRef: Ref<any|null> = ref(null);
    const editRoleRef: Ref<any|null> = ref(null);
    function handleDocumentClick(e:any) {
      const parent = refInputRole.value?.[0];
      const abutton = addRoleRef.value?.ref; // 不触发点击按钮
      const ebutton = editRoleRef.value?.[0]; // 不触发点击按钮
      
      const isInput = [parent, abutton, ebutton].some(t => {
        if (t) {
          return t.contains(e.target)
        } else {
          return false
        }
      })
      if (!isInput) {
        console.log(`%c roleData`, 'color:#4278ff;', roleData)
        roleData.data = roleData.data.filter(t => t.id !== "NewAdd");
        Object.assign(formData, {
          id: null,
          isInput: false,
          roleType: "",
          name: ""
        })
      }
    }

    onMounted(() => {
      getList("INIT");
      document.addEventListener("click", handleDocumentClick, false);
    })

    onUnmounted(() => {
      document.removeEventListener("click", handleDocumentClick, false);
    })
    
    return {
      getList, roleData, activeNode, nodeClick,
      formData,
      refInputRole, addRoleRef, editRoleRef,
      handlebtn,
      deleteRole, submitForm
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
  .role-box {
    min-height: 300px;
  }
  .role_name_ul {
    padding-bottom: 20px;
    .role_name_li {
      height: 36px;
      .name_input {
        box-sizing: border-box;
        padding: 2px 5px;

        .el-input_wrapper {
          box-shadow:0 0 0 0 1px var(--el-input-focus-border-color) inset;
        }

        .btnOk {
          cursor: pointer;
        }
      }
      .name_item {
        box-sizing: border-box;
        padding: 0 16px;
        width: 100%;
        height: 36px;
        line-height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          background: #f3f6fe;
          .btn {
            display: block;
          }
        }
        &.active {
          background-color: var(--el-color-primary-light-9);
          color: var(--el-color-primary);
        }
        .name_item_title {
          flex: 1;
          padding-right: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .btn {
          display: none;
        }
      }
    }
  }
}
</style>
<!-- 添加/编辑用户-->
<template>
  <div>
    <el-dialog
      :title="modalTitle"
      v-model="visible"
      width="600px"
      :close-on-click-modal="false"
      @open="openDialog"
      @close="closeDialog"
    >
      <el-form
        ref="formRef"
        :model="formData"
        label-width="100px"
      >
        <el-form-item
          label="邮箱"
          prop="loginName"
          :rules="[
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur',
            },
            emailReg
          ]"
        >
          <el-input
            v-model.trim="formData.loginName"
            :disabled="isEdit"
            placeholder="请输入邮箱"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="userName"
          :rules="{
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model.trim="formData.userName"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
          :rules="[
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur',
            },
            phoneReg
          ]"
        >
          <el-input
            v-model.trim="formData.phone"
            placeholder="请输入手机号"
            clearable
          />
        </el-form-item>
        
        <el-form-item
          v-if="!isEdit"
          label="密码"
          prop="password"
          :rules="[
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur',
            },
            pswReg
          ]"
        >
          <el-input
            v-model.trim="formData.password"
            placeholder="请输入密码"
            maxlength="30"
            type="password"
            show-password
            clearable
          />
        </el-form-item>
         <el-form-item
          label="职位"
          prop="position"
          :rules="{
            required: true,
            message: '请选择职位',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formData.position"
            placeholder="请选择职位"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in position_ENUM_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="roleIds"
          :rules="{
            required: true,
            message: '请选择角色',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formData.roleIds"
            placeholder="请选择角色"
            multiple
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in roleIdsOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="visible = false">
            取 消
          </el-button>
          <el-button
            type="primary"
            :loading="isLoading"
            @click="submitForm(formRef)"
          >
            确认保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, defineProps, toRefs } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { getRoleApi, addUser, updateUserInfo } from '@/api/user'

import {
  emailReg, pswReg, phoneReg
} from "@/utils/validate";
import {
  position_ENUM_OPTIONS
} from "@/utils/enum";

const resetFormData = () => {
  return {
    loginName: "",
    phone: "",
    position: "",
    userName: "",
    password: "",
    roleIds: [],
    status: "",
  };
};

export default defineComponent({
  props: {
    dialogData: Object
  },
  setup(props, ctx) {
    const store = useStore()
    const roleIdsOptions = ref([])

    const visible = ref(false)
    const isEdit = ref(false)
    const isLoading = ref(false)
    const formData = reactive({
      ...resetFormData()
    })
    const roleOptions = reactive([]);
    const formRef = ref<FormInstance>();

    const getAllMenu = async () => {
      const res = await getRoleApi();
      roleIdsOptions.value = res.data;
    }

    const openDialog = () => {
      getAllMenu()
      const { $type, ...last } = props.dialogData;
      isEdit.value = $type === "EDIT";
      Object.assign(formData, { ...last })
      // console.log(`%c handle`, 'color:#4278ff;', props)
    }
    const closeDialog = () => {
      Object.assign(formData, resetFormData());
      formRef.value.resetFields()
    }
    const submitForm = async (formEl: FormInstance | undefined) => {
      try {
        if (!formEl) return
        await formEl.validate();
        isLoading.value = true;
        if (isEdit.value) {
          await updateUserInfo(formData);
        } else {
          await addUser(formData);
        }
        isLoading.value = false;
        ElMessage({
          type: "success",
          message: "修改成功"
        });
        visible.value = false;
        ctx.emit("submit")
        
      } catch (error) {
        isLoading.value = false;
        console.log(`%c qjlog`, 'color:#4278ff;', error)
      }
    }
    return {
      isLoading,
      formRef,
      visible,
      isEdit,
      formData,
      roleOptions,
      roleIdsOptions,
      openDialog, closeDialog, submitForm,

      emailReg, pswReg, phoneReg,
      position_ENUM_OPTIONS
    }
  },
  computed: {
    modalTitle() {
      return this.isEdit ? "编辑用户" : "添加用户";
    }
  }
});
</script>

<style lang="scss" scoped>
.user-modal-wrap {
  .el-input,
  .el-select,
  .el-cascader {
    width: 560px;
  }
}
.eidt-user-modal-wrap {
  .el-form-item {
    margin-bottom: 0;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
}
</style>

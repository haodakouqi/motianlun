<!-- 重置密码-->
<template>
  <div v-drag="visible" class="reset-psw-modal-wrap">
    <el-dialog
      title="重置密码"
      v-model="visible"
      width="500px"
      :close-on-click-modal="false"
      @open="openDialog"
      @close="closeDialog"
    >
      <el-form
        ref="formRef"
        :model="formData"
        label-width="80px"
      >
        <el-form-item
          label="登录邮箱"
        >
          <span>{{ dialogData.loginName }}</span>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPassword"
          :rules="[
            {
              required: true,
              message: '请输入新密码',
              trigger: 'blur',
            },
            pswReg
          ]"
        >
          <el-input
            v-model.trim="formData.newPassword"
            placeholder="请输入密码"
            maxlength="30"
            type="password"
            show-password
            clearable
          />
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
            确认重置
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
// import { resetPassword } from '@/api/user'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import drag from '@/directive/drag/index'
import { adminUpdatePassword } from "@/api/user";
import {
  pswReg
} from "@/utils/validate";

export default defineComponent({
  props: {
    dialogData: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },
  directives: {
    drag
  },
  setup(props, ctx) {
    const visible = ref(false)
    const isLoading = ref(false)
    const formData = reactive({
      loginName: "",
      newPassword: '',
    })
    const formRef = ref<FormInstance>()

    const openDialog = () => {
      const { loginName } = props.dialogData
      Object.assign(formData, { loginName })
    }
    const closeDialog = () => {
      Object.assign(formData, {
        loginName: "",
        passnewPasswordword: '',
      });
      formRef.value.resetFields()
    }
    const submitForm = async (formEl: FormInstance | undefined) => {
      try {
        if (!formEl) return
        await formEl.validate();
        isLoading.value = true;
        await adminUpdatePassword(formData);
        isLoading.value = false;
        ElMessage({
          type: "success",
          message: "操作成功"
        });
        visible.value = false;
        
      } catch (error) {
        isLoading.value = false;
        // console.log(`%c qjlog`, 'color:#4278ff;', error)
      }
    }
    return {
      visible,
      isLoading,
      formRef,
      formData,
      openDialog,
      closeDialog,
      submitForm,
      pswReg
    }
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
.reset-psw-modal-wrap {
  .el-input,
  .el-select,
  .el-cascader {
    width: 560px;
  }
}
</style>

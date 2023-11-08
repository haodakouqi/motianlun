<template>
  <div>
    <el-dialog
      title="修改密码"
      v-model="visible"
      width="600px"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-form 
        ref="ruleForm"
        :model="formData"
        label-width="120px"
        style="margin-right:30px;"
      >
        <el-form-item
          label="用户名："
        >
          {{userInfo.userName}}
        </el-form-item>
        <el-form-item
          label="原密码："
          prop="oldPassword"
          :rules="{
            required: true,
            message: '请输入原密码',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.oldPassword" placeholder="请输入原密码" show-password></el-input>
        </el-form-item>
        <el-form-item
          label="新密码：" 
          prop="newPassword"
          :rules="{
            required: true,
            message: '请输入新密码',
            trigger: 'blur',
          }"
        >
          <el-input v-model="formData.newPassword" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="visible = false">
            取 消
          </el-button>
          <el-button
            type="primary"
            @click="submitForm(ruleForm)"
          >
            确认保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { Ref } from 'vue'
import { useStore } from 'vuex'
import type { ElFormItemContext, FormInstance, FormRules } from 'element-plus/lib/el-form/src/token'
import { ElMessage } from 'element-plus'
import { passwordChange } from '@/api/user'
export default defineComponent({
  setup(props, ctx) {
    const ruleForm: Ref<ElFormItemContext|null> = ref(null)
    const store = useStore()
    const visible = ref(false)
    const isLoading = ref(false)
    const formData = reactive({
      oldPassword: '',
      newPassword: ''
    })

    const userInfo = store.state.user.userInfo;

    const closeDialog = () => {
      formData.oldPassword = ''
      formData.newPassword = ''
      ruleForm.value.resetFields()
    }
    const submitForm = async (formEl: FormInstance | undefined) => {
      try {
        if (!formEl) return
        await formEl.validate();
        isLoading.value = true;
        await passwordChange(formData);
        isLoading.value = false;
        ElMessage({
          type: "success",
          message: "操作成功"
        });
        visible.value = false;

        store.dispatch('user/loginOut');
        
      } catch (error) {
        console.log(`%c qjlog`, 'color:#4278ff;', error)
      }
    }
    return {
      visible,
      isLoading,
      userInfo,
      formData,
      closeDialog,
      ruleForm,
      submitForm
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>
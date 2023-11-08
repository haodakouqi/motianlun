<!-- 授权渠道-->
<template>
  <div class="authAssetsDialog">
    <el-dialog
      title="授权渠道"
      v-model="visible"
      width="500px"
      :close-on-click-modal="false"
      @open="openDialog"
      @close="closeDialog"
    >
      <el-form
        ref="ruleFormRef"
        :model="formData"
        label-width="80px"
      >
        <el-form-item
          label="渠道"
          prop="assetCode"
          :rules="{
            required: true,
            message: '请选择渠道',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formData.assetCode"
            placeholder="请选择渠道"
            style="width: 100%"
            clearable
            filterable
            remote
            disabled
            :remote-method="glGetChannelList"
            :loading="glChannelListData.isLoading"
            @focus="glGetChannelList(formData.assetCode)"
          >
            <el-option
              v-for="item in glChannelListData.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户"
          prop="userIds"
          :rules="{
            required: true,
            message: '请选择用户',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formData.userIds"
            placeholder="请选择用户"
            style="width: 100%"
            clearable
            filterable
            multiple
          >
            <el-option
              v-for="item in glUserData.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
            @click="submitForm(ruleFormRef)"
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
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

import { listAuthedUser, upsertAuthAsset } from '@/api/custom'
import { 
  glUseChannelListSelect,
  glUserSelect
} from "@/utils/globalSearchSelect"

const resetFormData = () => {
  return {
    type: 2,
    assetCode: "",
    userIds: []
  };
};

export default defineComponent({
  props: {
    dialogData: Object
  },
  setup(props, ctx) {
    const visible = ref(false)
    const isLoading = ref(false)
    const formData = reactive({
      ...resetFormData()
    })
    const { glChannelListData, glGetChannelList } = glUseChannelListSelect();
    const { glUserData, glGetUserList } = glUserSelect();
    
    async function getSelect(assetCode: string) {
      try {
        const res = await listAuthedUser({assetCode, type: formData.type});
        formData.userIds = (res.data || []).map(t => t.id);
      } catch (error) {
        formData.userIds = [];
      }
    }

    const ruleFormRef = ref<FormInstance>();

    const openDialog = (data:Object) => {
      const { channelCode } = props.dialogData;
      formData.assetCode = channelCode;
      glGetChannelList(formData.assetCode)
      getSelect(formData.assetCode)
      glUserData.allUser = true;
      glGetUserList("")
    }
    const closeDialog = () => {
      Object.assign(formData, resetFormData());
      ruleFormRef.value.resetFields()
    }
    const submitForm = async (formEl: FormInstance | undefined) => {
      try {
        if (!formEl) return
        await formEl.validate();
        await upsertAuthAsset({...formData});

        isLoading.value = false;
        ElMessage({
          type: "success",
          message: "操作成功"
        });
        visible.value = false;
        // ctx.emit("submit")
        
      } catch (error) {
        isLoading.value = false;
        console.log(`%c qjlog`, 'color:#4278ff;', error)
      }
    }
    return {
      glChannelListData, glGetChannelList,
      glUserData, glGetUserList,

      ruleFormRef,
      visible,
      isLoading,
      formData,
      openDialog, closeDialog, submitForm
    }
  }
});
</script>

<style lang="scss" scoped>

</style>

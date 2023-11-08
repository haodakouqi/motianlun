<!-- 返点-->
<template>
  <div>
    <el-dialog
      :title="modalTitle"
      v-model="visible"
      width="700px"
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
          label="类型"
          prop="type"
          :rules="{
            required: true,
            message: '请选择类型',
            trigger: 'change',
          }"
        >
          <el-radio-group :disabled="isEdit" v-model="formData.type">
            <el-radio :label="1">系统渠道</el-radio>
            <el-radio :label="2">自定义渠道</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="formData.type === 1"
          label="渠道"
          prop="channelCode"
          :rules="{
            required: true,
            message: '请选择渠道',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formData.channelCode"
            placeholder="请选择渠道"
            clearable
            :disabled="isEdit && formData.type === 1"
            style="width: 100%"
          >
            <el-option
              v-for="item in allChannelOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="formData.type === 2"
          label="渠道名称"
          prop="channelName"
          :rules="{
            required: true,
            message: '请输入渠道名称',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model.trim="formData.channelName"
            :disabled="isEdit && formData.type === 1"
            placeholder="请输入渠道名称"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="渠道简称"
          prop="channelAbbName"
        >
          <el-input
            v-model.trim="formData.channelAbbName"
            placeholder="请输入渠道简称"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="媒体平台"
          prop="platforms"
          :rules="{
            required: true,
            message: '选择媒体平台',
            trigger: 'blur',
          }"
        >
          <el-select
            v-model="formData.platforms"
            placeholder="选择媒体平台"
            clearable
            multiple
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in mediaOptions"
              :key="item.id"
              :label="item.mediaName"
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
// import { resetPassword } from '@/api/user'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import {
  Plus,
  Delete,
} from '@element-plus/icons-vue'

import { addCorporationChannel,updateChannel } from '@/api/channel'
const resetFormData = () => {
  return {
    type: 1,
    channelCode: "",
    channelName: "",
    channelAbbName: "",
    platforms: [],
  };
};

export default defineComponent({
  props: {
    dialogData: Object
  },
  setup(props, ctx) {
    //  const { dialogData } = toRefs(props)
    const store = useStore()
    const mediaOptions = store.state.user.mediaOptions;
    const allChannelOptions = store.state.user.allChannelOptions;

    const visible = ref(false)
    const handleType = ref(false)
    const isEdit = ref(false)
    const isLoading = ref(false)
    const formData = reactive({
      ...resetFormData()
    })
    const formRef = ref<FormInstance>();

    const openDialog = (data:Object) => {
      const { $type, ...last } = props.dialogData;
      isEdit.value = $type === "EDIT";
      Object.assign(formData, { ...last })
      // console.log(`%c handle`, 'color:#4278ff;', isEdit.value, formData)
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
        const {type, channelCode, channelName, ...last} = formData;
        const params = {
          type,
           ...last
        };
        if (isEdit.value) {
          params.channelCode = channelCode;
          params.channelName= channelName;
          await updateChannel(params);
        } else {
          if (type === 1) {
            params.channelCode = channelCode;
          } else {
            params.channelName= channelName;
          }
          await addCorporationChannel(params);
        }
        isLoading.value = false;
        ElMessage({
          type: "success",
          message: "操作成功"
        });
        visible.value = false;
        ctx.emit("submit")
        console.log(`%c qjlog`, 'color:#4278ff;', formData)
        
      } catch (error) {
        isLoading.value = false;
        console.log(`%c qjlog`, 'color:#4278ff;', error)
      }
    }
    return {
      Delete,
      Plus,
      mediaOptions,
      allChannelOptions,
      visible,
      isEdit,
      isLoading,

      handleType,
      formRef,
      formData,
      openDialog, closeDialog, submitForm
    }
  },
  computed: {
    modalTitle() {
      return this.isEdit ? "编辑渠道" : "添加渠道";
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

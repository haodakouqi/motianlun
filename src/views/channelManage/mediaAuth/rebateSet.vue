<!-- 添加/编辑用户-->
<template>
  <div>
    <el-dialog
      :title="modalTitle"
      v-model="visible"
      width="400px"
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
          :label="`${agentIdLabel}`"
          prop="agentId"
          :rules="{
            required: true,
            message: `请输入${agentIdLabel}`,
            trigger: 'blur',
          }"
        >
          <el-input
            v-model.trim="formData.agentId"
            :placeholder="`请输入${agentIdLabel}`"
            type="number"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          :label="`${agentIdLabel}名称`"
        >
          <el-input
            v-model.trim="formData.agentName"
            :placeholder="`请输入${agentIdLabel}名称`"
          >
          </el-input>
        </el-form-item>
        
      </el-form>
      <template #footer>
        <div>
          <el-button @click="visible = false">
            取 消
          </el-button>
          <el-button
            type="primary"
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
import { defineComponent, ref, reactive, inject, toRefs } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

import { addUserAgent } from "@/api/channel";
const resetFormData = () => {
  return {
    agentId: "",
    agentName: "",
  };
};

export default defineComponent({
  props: {
    rebateData: Object
  },
  setup(props, ctx) {
    const store = useStore()
    const mediaOptions = store.state.user.mediaOptions;

    const agentIdLabel: any = inject("agentIdLabel");

    const visible = ref(false)
    const isEdit = ref(false)
    const isLoading = ref(false)
    const formData = reactive({
      ...resetFormData()
    })
    const roleOptions = reactive([]);
    const positionOptions = reactive([]);
    const formRef = ref<FormInstance>();

    const openDialog = () => {
      const { $type, ...last } = props.rebateData;
      isEdit.value = $type === "EDIT";
      Object.assign(formData, { ...last })
      console.log(`%c handle`, 'color:#4278ff;', props.rebateData)
    }
    const closeDialog = () => {
      Object.assign(formData, resetFormData());
      formRef.value.resetFields();
    }
    const submitForm = async (formEl: FormInstance | undefined) => {
      try {
        if (!formEl) return
        await formEl.validate();
        // console.log(`%c qjlog`, 'color:#4278ff;', formData)
        //   return
        isLoading.value = true;
        await addUserAgent(formData);
        isLoading.value = false;
        ElMessage({
          type: "success",
          message: "操作成功"
        });
        visible.value = false;
        ctx.emit("submit")
        
      } catch (error) {
        isLoading.value = false;
        console.log(`%c qjlog`, 'color:#4278ff;', error)
      }
    }
    return {
      agentIdLabel,
      formRef,
      visible,
      isEdit,
      isLoading,
      formData,
      roleOptions,
      positionOptions,
      mediaOptions,
      openDialog, closeDialog, submitForm
    }
  },
  computed: {
    modalTitle() {
      return `新增${this.agentIdLabel}`;
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

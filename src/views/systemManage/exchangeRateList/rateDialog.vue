<!-- 添加/编辑用户-->
<template>
  <div>
    <el-dialog
      :title="modalTitle"
      v-model="visible"
      width="500px"
      :close-on-click-modal="false"
      @open="openDialog"
      @close="closeDialog"
    >
      <el-form
        ref="formRef"
        :model="formData"
        label-width="60px"
      >
        <el-form-item
          label="From"
          prop="from"
          :rules="{
            required: true,
            message: '请选择Form',
            trigger: 'change',
          }"
        >
          <el-select
              v-model="formData.from"
              placeholder="请选择币种"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="item in CURRENCY_ENUM_OPTIONS"
                :key="item"
                :disabled="formData.to === item"
                :label="item"
                :value="item"
              />
            </el-select>
        </el-form-item>
        <el-form-item
          label="to"
          prop="to"
          :rules="{
            required: true,
            message: '请选择to',
            trigger: 'change',
          }"
        >
          <el-select
              v-model="formData.to"
              placeholder="请选择币种"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="item in CURRENCY_ENUM_OPTIONS"
                :key="item"
                :disabled="formData.from === item"
                :label="item"
                :value="item"
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
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  CURRENCY_ENUM_OPTIONS
} from "@/utils/enum";

import { addExchangeRate } from "@/api/system";
const resetFormData = () => {
  return {
    from: "",
    to: "",
  };
};

export default defineComponent({
  props: {
    dialogData: Object
  },
  setup(props, ctx) {
    const visible = ref(false)
    const isEdit = ref(false)
    const isLoading = ref(false)
    const formData = reactive({
      ...resetFormData()
    })
    const formRef = ref<FormInstance>();

    const openDialog = () => {
      const { $type, ...last } = props.dialogData;
      isEdit.value = $type === "EDIT";
      Object.assign(formData, { ...last })
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
        await addExchangeRate(formData);
        isLoading.value = false;
        ElMessage({
          type: "success",
          message: "操作成功"
        });
        visible.value = false;
        ctx.emit("submit")
        
      } catch (error) {
        console.log(`%c qjlog`, 'color:#4278ff;', error)
      }
    }
    return {
      formRef,
      visible,
      isEdit,
      isLoading,
      CURRENCY_ENUM_OPTIONS,
      formData,
      openDialog, closeDialog, submitForm
    }
  },
  computed: {
    modalTitle() {
      return this.isEdit ? "编辑汇率" : "添加汇率";
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

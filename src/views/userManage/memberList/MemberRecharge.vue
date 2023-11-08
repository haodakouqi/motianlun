<!-- 会员充值-->
<template>
  <div>
    <el-dialog
      title="会员充值"
      v-model="visible"
      width="500px"
      modal-class="MemberRecharge"
      :close-on-click-modal="false"
      @open="openDialog"
      @close="closeDialog"
    >
      <el-form
        ref="ruleFormRef"
        :model="formData"
        label-width="130px"
        label-position="top"
      >
        <el-form-item
          label="支付类型"
          prop="servicePeriod"
          :rules="{
            required: true,
            message: '请选择支付类型',
            trigger: 'change',
          }"
        >
          <div class="price-wrapper">
            <div
              v-for="t in priceList"
              :key="t.title"
              @click="() => formData.servicePeriod = t.servicePeriod"
              :class="['price-item', formData.servicePeriod === t.servicePeriod ? 'active' : '']" 
            >
              <h5>{{t.title}}</h5>
              <p>{{t.curency}}{{t.price}}</p>
            </div>
          </div>
        </el-form-item>
        <div class="global-flex">
          <el-form-item
            label="支付水单"
            prop="fileList"
            :rules="{
              required: true,
              message: '请选择文件',
              trigger: 'change',
            }"
            style="flex: 1"
          >
            <el-upload
              v-model:file-list="formData.fileList"
              :limit="1"
              :auto-upload="false"
              accept=".jpg,.png,jpeg"
              style="width: 100%"
            >
              <el-button type="primary">选择文件</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  请上传支付水单
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </div>
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
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { memberRechargeSubmitApply } from '@/api/system'

import { priceList } from '@/config'
const resetFormData = () => {
  return {
    servicePeriod: 1,
    fileList: [],
  };
};

export default defineComponent({
  props: {
  },
  setup(props, ctx) {
    const visible = ref(false)
    const isLoading = ref(false)
    const formData = reactive({
      ...resetFormData()
    })

    const ruleFormRef = ref<FormInstance>();

    const openDialog = (data:Object) => {
      // formData.platform = props.platform;
    }
    const closeDialog = () => {
      Object.assign(formData, resetFormData());
      ruleFormRef.value.resetFields()
    }

    const submitForm = async (formEl: FormInstance | undefined) => {
      try {
        if (!formEl) return
        await formEl.validate();
        const { servicePeriod, fileList } = formData;
        const file = fileList[0].raw;
        const form = new FormData();
        form.append("servicePeriod", servicePeriod);
        form.append("file", file);
        // console.log(`%c qjlog`, 'color:#4278ff;', formData)
        // return
        isLoading.value = true;
        await memberRechargeSubmitApply(form);

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
      priceList: priceList.filter(t => t.servicePeriod !== 0),
      ruleFormRef,
      visible,
      isLoading,
      formData,

      openDialog, closeDialog, submitForm,
    }
  }
});
</script>

<style lang="scss">
.MemberRecharge {
  .price-wrapper {
    width: 100%;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    .price-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid rgb(207, 207, 207);
      border-radius: 10px;
      padding: 20px;
      margin: 0 1px;
      h5 {
        font-size: 16px;
        color: (51, 54, 57)
      }
      p {
        font-size: 19px;
        color: var(--el-color-primary);
        margin-top: 12px;
      }

      &.active {
        margin: 0;
        border: 2px solid rgb(14, 218, 106);
      }
    }
  }
}
</style>

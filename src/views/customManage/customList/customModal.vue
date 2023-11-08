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
          label="操作方式"
          required
          v-if="!isEdit"
        >
          <el-radio-group v-model="isBatch">
            <el-radio :label="false">单个添加</el-radio>
            <el-radio :label="true">批量导入</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="!isBatch" key="singleHandle">
          <el-form-item
            label="客户名称"
            prop="name"
            :rules="{
              required: true,
              message: '请输入客户名称',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model.trim="formData.name"
              placeholder="请输入客户名称"
              :disabled="isEdit"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="客户简称"
          >
            <el-input
              v-model.trim="formData.abbName"
              placeholder="请输入客户简称"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="付款类型"
            prop="payType"
            :rules="{
              required: true,
              message: '请选择付款类型',
              trigger: 'change',
            }"
          >
            <el-select
              v-model="formData.payType"
              placeholder="请选择付款类型"
              style="width: 100%"
              :disabled="isEdit"
            >
              <el-option
                v-for="item in payType_ENUM_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="业务类型"
            prop="businessType"
            :rules="{
              required: true,
              message: '请选择业务类型',
              trigger: 'change',
            }"
          >
            <el-select
              v-model="formData.businessType"
              placeholder="请选择业务类型"
              style="width: 100%"
              :disabled="isEdit"
            >
              <el-option
                v-for="item in businessType_ENUM_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="商务"
          >
            <el-select
              v-model="formData.businessUser"
              placeholder="请选择商务"
              style="width: 100%"
              clearable
              filterable
              remote
              :remote-method="glGetPosition"
              :loading="glPositionData.isLoading"
              @focus="glGetPosition('')"
            >
              <el-option
                v-for="item in glPositionData.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="运营人"
          >
            <el-select
              v-model="formData.operator"
              placeholder="请选择运营人"
              style="width: 100%"
              clearable
              filterable
              remote
              :remote-method="glGetPositionOperator"
              :loading="glPositionDataOperator.isLoading"
              @focus="glGetPositionOperator('')"
            >
              <el-option
                v-for="item in glPositionDataOperator.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="合作媒体"
          >
            <el-select
              v-model="formData.platforms"
              placeholder="请选择媒体"
              style="width: 100%"
              clearable
              filterable
              multiple
            >
              <el-option
                v-for="item in mediaOptions"
                :key="item.id"
                :label="item.mediaName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </div>
        
        <div v-else key="batchHandle" class="global-flex">
          <el-form-item
            label="文件"
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
              accept=".xlsx"
              style="width: 100%"
            >
              <el-button type="primary">选择文件</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  请上传xlsx文件
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <glDownloadBtn 
            :downloadData="{
              type: 'CUSTOMER',
              FileName: '客户模板'
            }"
          />
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
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { addCustomer, editCustomer, importCustomer } from "@/api/custom";

import {
  glUseMediaListSelect,
  glUsePositionSelect
} from "@/utils/globalSearchSelect"

import {
  payType_ENUM, payType_ENUM_OPTIONS,
  businessType_ENUM, businessType_ENUM_OPTIONS
} from "@/utils/enum";

const resetFormData = () => {
  return {
    name: "",
    businessType: "",
    abbName: "",
    businessUser: "",
    operator: "",
    payType: "",
    platforms: [],
    fileList: [],
  };
};

export default defineComponent({
  props: {
    dialogData: Object
  },
  setup(props, ctx) {
    const store = useStore()
    const mediaOptions = store.state.user.mediaOptions;

    const visible = ref(false)
    const isEdit = ref(false)
    const isLoading = ref(false)

    

    const { glPositionData, glGetPosition } = glUsePositionSelect();
    glPositionData.position = "2"
    const { glPositionData: glPositionDataOperator, glGetPosition: glGetPositionOperator } = glUsePositionSelect();
    glPositionDataOperator.position = "3"

    const { glMediaListData, glGetMediaList } = glUseMediaListSelect();

    const isBatch = ref(false)
    const formData = reactive({
      ...resetFormData()
    })
    const roleOptions = reactive([]);
    const businessTypeOptions = reactive([]);
    const formRef = ref<FormInstance>();

    const openDialog = () => {
      const { $type, ...last } = props.dialogData;
      isEdit.value = $type === "EDIT";
      if (isEdit.value) {
        isBatch.value = false;
      }
      Object.assign(formData, { ...last })
      if (isEdit.value) {
        glGetPosition(formData.businessUser)
        glGetPositionOperator(formData.operator)
      }
    }
    const closeDialog = () => {
      isBatch.value = false;
      Object.assign(formData, resetFormData());
      formRef.value.resetFields()
    }
    const submitForm = async (formEl: FormInstance | undefined) => {
      try {
        console.log(`%c qjlog`, 'color:#4278ff;', formData, isBatch.value)
        const { fileList, ...last } = formData;
        if (!formEl) return
        await formEl.validate();

        // return
        isLoading.value = true;
        if (isEdit.value) {
          await editCustomer({ ...last });
        } else {
          if (isBatch.value) {
            const file = fileList[0].raw;
            const form = new FormData();
            form.append("file", file);
            await importCustomer(form);
          } else {
            await addCustomer({ ...last });
          }
        }
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
      visible,
      isEdit,
      isLoading,
      mediaOptions,

      payType_ENUM_OPTIONS,
      businessType_ENUM_OPTIONS,

      formRef,
      isBatch,
      formData,
      roleOptions,
      businessTypeOptions,
      openDialog, closeDialog, submitForm,

      glPositionData, glGetPosition,
      glPositionDataOperator, glGetPositionOperator,
      glMediaListData, glGetMediaList
    }
  },
  computed: {
    modalTitle() {
      return this.isEdit ? "编辑客户" : "添加客户";
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

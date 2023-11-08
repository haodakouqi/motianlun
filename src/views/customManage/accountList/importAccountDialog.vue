<!-- 返点-->
<template>
  <div>
    <el-dialog
      title="导入账号"
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
          label="媒体平台"
          prop="platform"
          :rules="{
            required: true,
            message: '选择媒体平台',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formData.platform"
            placeholder="选择媒体平台"
            clearable
            filterable
            disabled
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
        <el-form-item
          label="渠道编码"
          prop="platform"
          :rules="{
            required: true,
            message: '选择渠道编码',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formData.channelCode"
            placeholder="渠道编码/名称"
            clearable
            filterable
            remote
            :remote-method="glGetChannelList"
            :loading="glChannelListData.isLoading"
            @focus="glGetChannelList('')"
            style="width: 100%"
          >
            <el-option
              v-for="item in glChannelListData.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <div class="global-flex">
          <el-form-item
            label="文件"
            prop="fileList"
            :rules="{
              required: true,
              message: '请选择文件',
              trigger: 'blur',
            }"
            style="flex: 1"
          >
            <el-upload
              v-model:file-list="formData.fileList"
              :limit="1"
              :auto-upload="false"
              :on-change="onChange"
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
              type: downloadName,
              FileName: '账号模板'
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
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import {
  Plus,
  Delete,
} from '@element-plus/icons-vue'
import { importAccount } from '@/api/account'
import {
  media_DOWNLOAD_ENUM
} from "@/utils/enum";

import {
  glUseChannelListSelect,
} from "@/utils/globalSearchSelect"
const resetFormData = () => {
  return {
    platform: null,
    channelCode: null,
    fileList: [],
  };
};

export default defineComponent({
  props: {
    platform: [Number]
  },
  setup(props, ctx) {
    //  const { dialogData } = toRefs(props)
    const store = useStore()
    const mediaOptions = store.state.user.mediaOptions;

    const visible = ref(false)
    const isLoading = ref(false)
    const formData = reactive({
      ...resetFormData()
    })
    const downloadName = computed(() => media_DOWNLOAD_ENUM[formData.platform] ||media_DOWNLOAD_ENUM.other)

    const { glChannelListData, glGetChannelList } = glUseChannelListSelect();
    watch(() => formData.platform, (newVal: any) => {
      glChannelListData.platform = newVal;
      formData.channelCode = null;
    },{ immediate: true })

    const ruleFormRef = ref<FormInstance>();

    const openDialog = (data:Object) => {
      formData.platform = props.platform;
      console.log(`%c openDialog`, 'color:#4278ff;', props.platform)
    }
    const closeDialog = () => {
      Object.assign(formData, resetFormData());
      ruleFormRef.value.resetFields()
    }
    const onChange = (UploadFile:any) => {
      console.log(`%c onChange`, 'color:#4278ff;', UploadFile)
    }

    const submitForm = async (formEl: FormInstance | undefined) => {
      try {
        if (!formEl) return
        await formEl.validate();
        const { platform, channelCode, fileList } = formData;
        const file = fileList[0].raw;
        const form = new FormData();
        form.append("channelCode", channelCode);
        form.append("platform", platform);
        form.append("file", file);
        // console.log(`%c qjlog`, 'color:#4278ff;', form)

        isLoading.value = true;
        await importAccount(form);

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
      mediaOptions,
      ruleFormRef,
      visible,
      isLoading,
      formData,
      glChannelListData, glGetChannelList,

      onChange,
      openDialog, closeDialog, submitForm,

      Delete, Plus, downloadName
      
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

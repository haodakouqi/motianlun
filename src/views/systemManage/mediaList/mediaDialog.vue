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
        label-width="50px"
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
          <el-radio-group v-model="formData.type">
            <el-radio :label="1">系统媒体</el-radio>
            <el-radio :label="2">自定义媒体</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="formData.type === 1"
          label="媒体"
          prop="platform"
          :rules="{
            required: true,
            message: '请选择媒体',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formData.platform"
            placeholder="请选择媒体"
            style="width: 100%"
          >
            <el-option
              v-for="item in allmediaOptions"
              :key="item.id"
              :label="item.mediaName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="formData.type === 2"
          label="媒体"
          prop="mediaName"
          :rules="{
            required: true,
            message: '请输入媒体',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model.trim="formData.mediaName"
            placeholder="请输入媒体"
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
import { defineComponent, ref, reactive } from 'vue'
import type { Ref } from "vue";
import { useStore } from 'vuex'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { listDefaultMedia, addCorporationMedia } from "@/api/system";

const resetFormData = () => {
  return {
    type: 1,
    platform: "",
    mediaName: ""
  };
};

export default defineComponent({
  props: {
    dialogData: Object
  },
  setup(props, ctx) {
    const store = useStore()
    const visible = ref(false)
    const isEdit = ref(false)
    const isLoading = ref(false)
    const formData = reactive({
      ...resetFormData()
    })

    const allmediaOptions = ref([])
    const getAllMenuTree = async () => {
      const res = await listDefaultMedia();
      allmediaOptions.value = res.data;
    }

    const formRef: Ref<any|null> = ref<FormInstance>();
    
    const openDialog = () => {
      getAllMenuTree()
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
        const {type, platform, mediaName, ...last} = formData;
        const params = {
          type,
           ...last
        };
        if (type === 1) {
          params.platform = platform;
        } else {
          params.mediaName= mediaName;
        }
        await addCorporationMedia(params);
        store.dispatch("user/getMediaAllList")
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
      isLoading,
      allmediaOptions,
      formRef,
      visible,
      isEdit,
      formData,
      openDialog, closeDialog, submitForm
    }
  },
  computed: {
    modalTitle() {
      return this.isEdit ? "编辑媒体" : "添加媒体";
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

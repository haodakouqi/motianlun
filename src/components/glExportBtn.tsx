import { defineComponent, ref, computed } from 'vue'
import {
  Download
} from '@element-plus/icons-vue'
import { $CreatDownload } from "@/utils/methods";
// 状态组件需要使用 defineComponent
export default defineComponent({
  props: {
    exportData: Object,
    exportType: {
      type: String,
      default: "button"
    },
    exportBtnName: {
      type: String,
      default: "导出"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isLoading = ref(false)
    const parentData = computed(() => props.exportData)

    // 导出数据
    const exportTable = async () => {
      const { exportFn, params, FileName } = parentData.value;
      try {
        if (typeof exportFn !== "function") {
          return;
        }
        isLoading.value = true;
        const file = await exportFn({
          ...(params || {})
        })
        isLoading.value = false;
        $CreatDownload({
          file: file,
          FileName: `${FileName || '导出.xlsx'}`
        })
      } catch (error) {
        console.warn(error)
        isLoading.value = false;
      }
    }
    if (props.exportType !== 'button') {
      return () => (
        <>
          <el-button
            icon={Download}
            link
            type="primary"
            disabled={props.disabled}
            loading={isLoading.value}
            onClick={() => exportTable()}
          >
            {props.exportBtnName}
          </el-button>
        </>
      )
    } else {
      return () => (
        <>
          <el-button
            plain
            disabled={props.disabled}
            loading={isLoading.value}
            onClick={() => exportTable()}
          >
            {props.exportBtnName}
          </el-button>
        </>
      )

    }
  }
})
